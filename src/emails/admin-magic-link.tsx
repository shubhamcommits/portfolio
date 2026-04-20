import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface AdminMagicLinkProps {
  url: string;
  expiresInMinutes: number;
}

export const AdminMagicLink = ({
  url = "https://shubhamsinngh.com/admin/verify?token=example",
  expiresInMinutes = 15,
}: AdminMagicLinkProps) => {
  return (
    <Html>
      <Head />
      <Preview>Admin sign-in link for shubhamsinngh.com</Preview>

      <Tailwind>
        <Body className="bg-zinc-50 my-auto mx-auto font-sans p-4">
          <Container className="bg-white border border-solid border-zinc-200 rounded-lg mx-auto p-8 max-w-[500px]">
            <Section>
              <Heading className="text-zinc-900 text-[24px] font-semibold mb-0">
                Sign in to admin
              </Heading>
              <Text className="text-zinc-500 text-[14px] mt-1 mb-6">
                Click the button below to access your portfolio analytics dashboard.
                This link expires in {expiresInMinutes} minutes and can only be used once.
              </Text>
            </Section>

            <Section className="text-center my-6">
              <Link
                href={url}
                className="bg-zinc-900 text-white text-[14px] font-medium no-underline rounded-md px-6 py-3 inline-block"
              >
                Open Admin Dashboard
              </Link>
            </Section>

            <Section>
              <Text className="text-zinc-500 text-[12px] mt-0 mb-1">
                Or copy this URL into your browser:
              </Text>
              <Text className="text-zinc-700 text-[12px] mt-0 mb-0 break-all">
                {url}
              </Text>
            </Section>

            <Hr className="border-zinc-200 my-6" />

            <Section>
              <Text className="text-zinc-400 text-[12px] mt-0 mb-0 text-center">
                If you didn&apos;t request this, you can safely ignore the email.
              </Text>
            </Section>
          </Container>

          <Text className="text-zinc-400 text-[11px] text-center mt-4">
            shubhamsinngh.com &middot; Admin Sign-in
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdminMagicLink;
