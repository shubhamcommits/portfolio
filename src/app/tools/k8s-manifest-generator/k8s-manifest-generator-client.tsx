"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/ui/navbar";
import Link from "next/link";
import yaml from "js-yaml";

type ResourceType = "deployment" | "service" | "ingress" | "configmap" | "secret" | "cronjob" | "hpa" | "pdb";

interface ContainerPort {
  containerPort: number;
  protocol: string;
}

interface EnvVar {
  name: string;
  value: string;
}

interface FormState {
  resourceType: ResourceType;
  name: string;
  namespace: string;
  labels: string;
  // Deployment
  replicas: number;
  image: string;
  containerPort: number;
  cpuRequest: string;
  cpuLimit: string;
  memoryRequest: string;
  memoryLimit: string;
  envVars: EnvVar[];
  livenessPath: string;
  readinessPath: string;
  strategy: "RollingUpdate" | "Recreate";
  maxSurge: string;
  maxUnavailable: string;
  // Service
  serviceType: "ClusterIP" | "NodePort" | "LoadBalancer";
  servicePort: number;
  targetPort: number;
  // Ingress
  ingressHost: string;
  ingressPath: string;
  ingressClassName: string;
  tlsEnabled: boolean;
  tlsSecretName: string;
  // ConfigMap
  configData: string;
  // Secret
  secretData: string;
  // CronJob
  schedule: string;
  cronImage: string;
  cronCommand: string;
  successfulJobsLimit: number;
  failedJobsLimit: number;
  // HPA
  hpaMinReplicas: number;
  hpaMaxReplicas: number;
  hpaTargetCpu: number;
  hpaTargetMemory: number;
  hpaDeploymentName: string;
  // PDB
  pdbMinAvailable: string;
  pdbDeploymentName: string;
}

const DEFAULT_STATE: FormState = {
  resourceType: "deployment",
  name: "web-app",
  namespace: "default",
  labels: "app: web-app",
  replicas: 3,
  image: "nginx:1.25-alpine",
  containerPort: 80,
  cpuRequest: "100m",
  cpuLimit: "500m",
  memoryRequest: "64Mi",
  memoryLimit: "256Mi",
  envVars: [],
  livenessPath: "/healthz",
  readinessPath: "/ready",
  strategy: "RollingUpdate",
  maxSurge: "25%",
  maxUnavailable: "25%",
  serviceType: "ClusterIP",
  servicePort: 80,
  targetPort: 80,
  ingressHost: "app.example.com",
  ingressPath: "/",
  ingressClassName: "nginx",
  tlsEnabled: false,
  tlsSecretName: "tls-secret",
  configData: "APP_ENV: production\nLOG_LEVEL: info",
  secretData: "DB_PASSWORD: c2VjcmV0\nAPI_KEY: bXlhcGlrZXk=",
  schedule: "0 */6 * * *",
  cronImage: "alpine:3.18",
  cronCommand: "echo 'Running scheduled task'",
  successfulJobsLimit: 3,
  failedJobsLimit: 1,
  hpaMinReplicas: 2,
  hpaMaxReplicas: 10,
  hpaTargetCpu: 70,
  hpaTargetMemory: 80,
  hpaDeploymentName: "web-app",
  pdbMinAvailable: "1",
  pdbDeploymentName: "web-app",
};

const RESOURCE_TYPES: { key: ResourceType; label: string; short: string }[] = [
  { key: "deployment", label: "Deployment", short: "Deploy" },
  { key: "service", label: "Service", short: "Svc" },
  { key: "ingress", label: "Ingress", short: "Ing" },
  { key: "configmap", label: "ConfigMap", short: "CM" },
  { key: "secret", label: "Secret", short: "Sec" },
  { key: "cronjob", label: "CronJob", short: "CJ" },
  { key: "hpa", label: "HPA", short: "HPA" },
  { key: "pdb", label: "PDB", short: "PDB" },
];

function parseLabels(raw: string): Record<string, string> {
  const labels: Record<string, string> = {};
  raw.split("\n").forEach((line) => {
    const [k, ...rest] = line.split(":");
    if (k?.trim() && rest.length > 0) {
      labels[k.trim()] = rest.join(":").trim();
    }
  });
  return labels;
}

function parseKeyValues(raw: string): Record<string, string> {
  const data: Record<string, string> = {};
  raw.split("\n").forEach((line) => {
    const [k, ...rest] = line.split(":");
    if (k?.trim() && rest.length > 0) {
      data[k.trim()] = rest.join(":").trim();
    }
  });
  return data;
}

function generateManifest(form: FormState): string {
  const labels = parseLabels(form.labels);
  const ns = form.namespace || "default";

  switch (form.resourceType) {
    case "deployment": {
      const manifest: Record<string, unknown> = {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: { name: form.name, namespace: ns, labels },
        spec: {
          replicas: form.replicas,
          selector: { matchLabels: labels },
          strategy: form.strategy === "RollingUpdate"
            ? { type: "RollingUpdate", rollingUpdate: { maxSurge: form.maxSurge, maxUnavailable: form.maxUnavailable } }
            : { type: "Recreate" },
          template: {
            metadata: { labels },
            spec: {
              containers: [{
                name: form.name,
                image: form.image,
                ports: [{ containerPort: form.containerPort }],
                resources: {
                  requests: { cpu: form.cpuRequest, memory: form.memoryRequest },
                  limits: { cpu: form.cpuLimit, memory: form.memoryLimit },
                },
                ...(form.livenessPath ? {
                  livenessProbe: { httpGet: { path: form.livenessPath, port: form.containerPort }, initialDelaySeconds: 10, periodSeconds: 10 },
                } : {}),
                ...(form.readinessPath ? {
                  readinessProbe: { httpGet: { path: form.readinessPath, port: form.containerPort }, initialDelaySeconds: 5, periodSeconds: 5 },
                } : {}),
                ...(form.envVars.length > 0 ? {
                  env: form.envVars.filter(e => e.name).map(e => ({ name: e.name, value: e.value })),
                } : {}),
              }],
            },
          },
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "service": {
      const manifest = {
        apiVersion: "v1",
        kind: "Service",
        metadata: { name: form.name, namespace: ns, labels },
        spec: {
          type: form.serviceType,
          selector: labels,
          ports: [{ port: form.servicePort, targetPort: form.targetPort, protocol: "TCP" }],
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "ingress": {
      const manifest: Record<string, unknown> = {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
          name: form.name,
          namespace: ns,
          labels,
          annotations: { "nginx.ingress.kubernetes.io/rewrite-target": "/" },
        },
        spec: {
          ingressClassName: form.ingressClassName,
          ...(form.tlsEnabled ? {
            tls: [{ hosts: [form.ingressHost], secretName: form.tlsSecretName }],
          } : {}),
          rules: [{
            host: form.ingressHost,
            http: {
              paths: [{
                path: form.ingressPath,
                pathType: "Prefix",
                backend: { service: { name: form.name, port: { number: form.servicePort } } },
              }],
            },
          }],
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "configmap": {
      const manifest = {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: { name: form.name, namespace: ns, labels },
        data: parseKeyValues(form.configData),
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "secret": {
      const manifest = {
        apiVersion: "v1",
        kind: "Secret",
        metadata: { name: form.name, namespace: ns, labels },
        type: "Opaque",
        data: parseKeyValues(form.secretData),
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "cronjob": {
      const manifest = {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: { name: form.name, namespace: ns, labels },
        spec: {
          schedule: form.schedule,
          successfulJobsHistoryLimit: form.successfulJobsLimit,
          failedJobsHistoryLimit: form.failedJobsLimit,
          jobTemplate: {
            spec: {
              template: {
                spec: {
                  containers: [{
                    name: form.name,
                    image: form.cronImage,
                    command: ["/bin/sh", "-c", form.cronCommand],
                  }],
                  restartPolicy: "OnFailure",
                },
              },
            },
          },
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "hpa": {
      const manifest = {
        apiVersion: "autoscaling/v2",
        kind: "HorizontalPodAutoscaler",
        metadata: { name: `${form.hpaDeploymentName}-hpa`, namespace: ns, labels },
        spec: {
          scaleTargetRef: { apiVersion: "apps/v1", kind: "Deployment", name: form.hpaDeploymentName },
          minReplicas: form.hpaMinReplicas,
          maxReplicas: form.hpaMaxReplicas,
          metrics: [
            { type: "Resource", resource: { name: "cpu", target: { type: "Utilization", averageUtilization: form.hpaTargetCpu } } },
            { type: "Resource", resource: { name: "memory", target: { type: "Utilization", averageUtilization: form.hpaTargetMemory } } },
          ],
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    case "pdb": {
      const manifest = {
        apiVersion: "policy/v1",
        kind: "PodDisruptionBudget",
        metadata: { name: `${form.pdbDeploymentName}-pdb`, namespace: ns, labels },
        spec: {
          minAvailable: isNaN(Number(form.pdbMinAvailable)) ? form.pdbMinAvailable : Number(form.pdbMinAvailable),
          selector: { matchLabels: labels },
        },
      };
      return yaml.dump(manifest, { indent: 2, lineWidth: -1, noRefs: true });
    }

    default:
      return "";
  }
}

function InputField({ label, value, onChange, placeholder, type = "text", small = false }: {
  label: string; value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string; small?: boolean;
}) {
  return (
    <div className={small ? "flex-1 min-w-0" : ""}>
      <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/30 transition-all"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/30 transition-all"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-mono placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
      />
    </div>
  );
}

export default function K8sManifestGeneratorClient() {
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const output = useMemo(() => generateManifest(form), [form]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const addEnvVar = () => {
    update("envVars", [...form.envVars, { name: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    update("envVars", form.envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (index: number, field: "name" | "value", val: string) => {
    const updated = [...form.envVars];
    updated[index] = { ...updated[index], [field]: val };
    update("envVars", updated);
  };

  const renderForm = () => {
    switch (form.resourceType) {
      case "deployment":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Image" value={form.image} onChange={(v) => update("image", v)} placeholder="nginx:1.25-alpine" />
              <InputField label="Replicas" value={form.replicas} onChange={(v) => update("replicas", parseInt(v) || 1)} type="number" />
            </div>
            <InputField label="Container Port" value={form.containerPort} onChange={(v) => update("containerPort", parseInt(v) || 80)} type="number" />

            <SelectField label="Strategy" value={form.strategy} onChange={(v) => update("strategy", v as FormState["strategy"])} options={[
              { value: "RollingUpdate", label: "Rolling Update" },
              { value: "Recreate", label: "Recreate" },
            ]} />
            {form.strategy === "RollingUpdate" && (
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Max Surge" value={form.maxSurge} onChange={(v) => update("maxSurge", v)} placeholder="25%" />
                <InputField label="Max Unavailable" value={form.maxUnavailable} onChange={(v) => update("maxUnavailable", v)} placeholder="25%" />
              </div>
            )}

            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider pt-2">Resources</p>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="CPU Request" value={form.cpuRequest} onChange={(v) => update("cpuRequest", v)} placeholder="100m" small />
              <InputField label="CPU Limit" value={form.cpuLimit} onChange={(v) => update("cpuLimit", v)} placeholder="500m" small />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Memory Request" value={form.memoryRequest} onChange={(v) => update("memoryRequest", v)} placeholder="64Mi" small />
              <InputField label="Memory Limit" value={form.memoryLimit} onChange={(v) => update("memoryLimit", v)} placeholder="256Mi" small />
            </div>

            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider pt-2">Health Checks</p>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Liveness Path" value={form.livenessPath} onChange={(v) => update("livenessPath", v)} placeholder="/healthz" />
              <InputField label="Readiness Path" value={form.readinessPath} onChange={(v) => update("readinessPath", v)} placeholder="/ready" />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Environment Variables</p>
                <button onClick={addEnvVar} className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors">+ Add</button>
              </div>
              {form.envVars.map((env, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={env.name} onChange={(e) => updateEnvVar(i, "name", e.target.value)} placeholder="KEY" className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-mono placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 transition-all" />
                  <input value={env.value} onChange={(e) => updateEnvVar(i, "value", e.target.value)} placeholder="value" className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-mono placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 transition-all" />
                  <button onClick={() => removeEnvVar(i)} className="text-red-400/60 hover:text-red-400 text-xs px-2 transition-colors">&times;</button>
                </div>
              ))}
            </div>
          </div>
        );

      case "service":
        return (
          <div className="space-y-4">
            <SelectField label="Service Type" value={form.serviceType} onChange={(v) => update("serviceType", v as FormState["serviceType"])} options={[
              { value: "ClusterIP", label: "ClusterIP" },
              { value: "NodePort", label: "NodePort" },
              { value: "LoadBalancer", label: "LoadBalancer" },
            ]} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Port" value={form.servicePort} onChange={(v) => update("servicePort", parseInt(v) || 80)} type="number" />
              <InputField label="Target Port" value={form.targetPort} onChange={(v) => update("targetPort", parseInt(v) || 80)} type="number" />
            </div>
          </div>
        );

      case "ingress":
        return (
          <div className="space-y-4">
            <InputField label="Host" value={form.ingressHost} onChange={(v) => update("ingressHost", v)} placeholder="app.example.com" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Path" value={form.ingressPath} onChange={(v) => update("ingressPath", v)} placeholder="/" />
              <InputField label="Ingress Class" value={form.ingressClassName} onChange={(v) => update("ingressClassName", v)} placeholder="nginx" />
            </div>
            <InputField label="Backend Service Port" value={form.servicePort} onChange={(v) => update("servicePort", parseInt(v) || 80)} type="number" />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.tlsEnabled} onChange={(e) => update("tlsEnabled", e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-cyan-500/30" />
                <span className="text-xs text-neutral-300">Enable TLS</span>
              </label>
            </div>
            {form.tlsEnabled && (
              <InputField label="TLS Secret Name" value={form.tlsSecretName} onChange={(v) => update("tlsSecretName", v)} placeholder="tls-secret" />
            )}
          </div>
        );

      case "configmap":
        return (
          <TextAreaField label="Data (KEY: value per line)" value={form.configData} onChange={(v) => update("configData", v)} placeholder="APP_ENV: production&#10;LOG_LEVEL: info" rows={6} />
        );

      case "secret":
        return (
          <div className="space-y-4">
            <TextAreaField label="Data (KEY: base64value per line)" value={form.secretData} onChange={(v) => update("secretData", v)} placeholder="DB_PASSWORD: c2VjcmV0&#10;API_KEY: bXlhcGlrZXk=" rows={6} />
            <p className="text-[10px] text-neutral-500">Values must be base64-encoded. Use <code className="text-cyan-400">echo -n &apos;value&apos; | base64</code></p>
          </div>
        );

      case "cronjob":
        return (
          <div className="space-y-4">
            <InputField label="Schedule (cron)" value={form.schedule} onChange={(v) => update("schedule", v)} placeholder="0 */6 * * *" />
            <InputField label="Image" value={form.cronImage} onChange={(v) => update("cronImage", v)} placeholder="alpine:3.18" />
            <InputField label="Command" value={form.cronCommand} onChange={(v) => update("cronCommand", v)} placeholder="echo 'hello'" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Success History Limit" value={form.successfulJobsLimit} onChange={(v) => update("successfulJobsLimit", parseInt(v) || 3)} type="number" />
              <InputField label="Failed History Limit" value={form.failedJobsLimit} onChange={(v) => update("failedJobsLimit", parseInt(v) || 1)} type="number" />
            </div>
          </div>
        );

      case "hpa":
        return (
          <div className="space-y-4">
            <InputField label="Target Deployment" value={form.hpaDeploymentName} onChange={(v) => update("hpaDeploymentName", v)} placeholder="web-app" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Min Replicas" value={form.hpaMinReplicas} onChange={(v) => update("hpaMinReplicas", parseInt(v) || 1)} type="number" />
              <InputField label="Max Replicas" value={form.hpaMaxReplicas} onChange={(v) => update("hpaMaxReplicas", parseInt(v) || 10)} type="number" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Target CPU %" value={form.hpaTargetCpu} onChange={(v) => update("hpaTargetCpu", parseInt(v) || 70)} type="number" />
              <InputField label="Target Memory %" value={form.hpaTargetMemory} onChange={(v) => update("hpaTargetMemory", parseInt(v) || 80)} type="number" />
            </div>
          </div>
        );

      case "pdb":
        return (
          <div className="space-y-4">
            <InputField label="Target Deployment" value={form.pdbDeploymentName} onChange={(v) => update("pdbDeploymentName", v)} placeholder="web-app" />
            <InputField label="Min Available (number or percentage)" value={form.pdbMinAvailable} onChange={(v) => update("pdbMinAvailable", v)} placeholder="1 or 50%" />
          </div>
        );
    }
  };

  return (
    <section className="relative h-screen bg-black flex flex-col overflow-hidden">
      <Navbar className="top-2" />
      <div className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 min-h-0">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <Link href="/tools" className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors mb-1 inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Tools
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Kubernetes Manifest Generator</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configure resources using the form and get production-ready YAML instantly.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          {/* Form Panel */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col min-h-0">
            <div className="px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <span className="text-xs text-neutral-500">Configuration</span>
            </div>
            <div className="p-5 space-y-5 overflow-y-auto flex-1 min-h-0">
              {/* Resource Type Selector */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-2">Resource Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {RESOURCE_TYPES.map((rt) => (
                    <button
                      key={rt.key}
                      onClick={() => update("resourceType", rt.key)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${form.resourceType === rt.key
                        ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
                        : "border-white/10 text-neutral-500 hover:text-white hover:border-white/20"
                        }`}
                    >
                      <span className="hidden sm:inline">{rt.label}</span>
                      <span className="sm:hidden">{rt.short}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Common fields */}
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Name" value={form.name} onChange={(v) => update("name", v)} placeholder="web-app" />
                <InputField label="Namespace" value={form.namespace} onChange={(v) => update("namespace", v)} placeholder="default" />
              </div>
              <TextAreaField label="Labels (key: value per line)" value={form.labels} onChange={(v) => update("labels", v)} placeholder="app: web-app" rows={2} />

              {/* Resource-specific form */}
              <div className="pt-2 border-t border-white/5">
                {renderForm()}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-neutral-500">{form.name}.yaml</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  {RESOURCE_TYPES.find(r => r.key === form.resourceType)?.label}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
              >
                {copied ? "Copied!" : "Copy YAML"}
              </button>
            </div>
            <pre className="p-5 text-sm font-mono text-neutral-200 overflow-auto flex-1 min-h-0 leading-relaxed">
              {output}
            </pre>
          </div>
        </div>

        <p className="flex-shrink-0 text-center text-[10px] text-neutral-600 mt-3">
          Everything runs in your browser. Your manifests never leave your machine.
        </p>
      </div>
    </section>
  );
}
