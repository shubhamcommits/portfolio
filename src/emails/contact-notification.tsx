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

interface ContactNotificationProps {
  name: string;
  email: string;
  message: string;
}

export const ContactNotification = ({
  name = "Someone",
  email = "hello@example.com",
  message = "Just wanted to say hi!",
}: ContactNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {name} via your portfolio</Preview>

      <Tailwind>
        <Body className="bg-zinc-50 my-auto mx-auto font-sans p-4">
          <Container className="bg-white border border-solid border-zinc-200 rounded-lg mx-auto p-8 max-w-[500px]">
            <Section>
              <Heading className="text-zinc-900 text-[24px] font-semibold mb-0">
                New Contact Form Message
              </Heading>
              <Text className="text-zinc-500 text-[14px] mt-1 mb-6">
                Someone reached out through your portfolio website.
              </Text>
            </Section>

            <Section className="bg-zinc-50 rounded-lg p-5 border border-solid border-zinc-100">
              <Text className="text-zinc-500 text-[12px] font-medium uppercase tracking-wider mt-0 mb-1">
                From
              </Text>
              <Text className="text-zinc-900 text-[16px] font-medium mt-0 mb-0">
                {name}
              </Text>
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 text-[14px] no-underline"
              >
                {email}
              </Link>
            </Section>

            <Section className="mt-6">
              <Text className="text-zinc-500 text-[12px] font-medium uppercase tracking-wider mt-0 mb-2">
                Message
              </Text>
              <Text className="text-zinc-900 text-[15px] leading-[26px] mt-0 whitespace-pre-wrap">
                {message}
              </Text>
            </Section>

            <Hr className="border-zinc-200 my-6" />

            <Section>
              <Text className="text-zinc-400 text-[12px] mt-0 mb-0 text-center">
                Reply directly to this email to respond to {name}.
              </Text>
            </Section>
          </Container>

          <Text className="text-zinc-400 text-[11px] text-center mt-4">
            shubhamsinngh.com &middot; Portfolio Contact Form
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactNotification;
