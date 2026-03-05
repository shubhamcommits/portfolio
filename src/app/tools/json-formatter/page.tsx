import { Metadata } from "next";
import JsonFormatterClient from "./json-formatter-client";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online Tool | Beautify & Minify JSON",
  description:
    "Format, validate, and beautify JSON instantly. Minify, sort keys, fix common errors, and copy with one click. Free, no sign-up, runs entirely in your browser.",
  keywords: [
    "json formatter",
    "json formatter online",
    "json validator",
    "json beautifier",
    "json prettifier",
    "format json",
    "validate json",
    "json lint",
    "json minify",
    "json viewer",
    "pretty print json",
    "json parser online",
    "json editor online",
    "json syntax checker",
    "beautify json online",
  ],
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
