import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

// ✅ Remove TypeScript interface and replace with normal props destructuring
const PasswordResetEmail = ({ userEmail, resetUrl, requestTime }) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                We received a password reset request for your account associated with{' '}
                <strong>{userEmail}</strong>. If you made this request, click the button below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                This link will expire in <strong>{requestTime}</strong> for security reasons.
              </Text>
            </Section>

            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-[12px] px-[24px] rounded-[6px] text-[16px] no-underline box-border"
              >
                Reset Your Password
              </Button>
            </Section>

            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                If the button doesn't work, copy and paste this link into your browser:
              </Text>
              <Link href={resetUrl} className="text-blue-600 underline text-[14px] break-all">
                {resetUrl}
              </Link>
            </Section>

            <Section className="bg-gray-50 p-[20px] rounded-[6px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 mb-[8px] font-semibold">
                🔒 Security Notice
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                • If you didn't request this password reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                • Never share your password or reset links with anyone
              </Text>
              <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                • This link can only be used once and will expire soon
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center mb-[8px]">
                This email was sent to {userEmail}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
