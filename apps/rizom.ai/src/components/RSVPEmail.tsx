import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Head,
  Preview,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export default function RSVPConfirmation() {
  return (
    <Html>
      <Head />
      <Preview>Thank you for RSVPing to Exploring the Future of Work & Play</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-[580px]">
            <Section className="bg-white">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                RSVP Confirmation
              </h1>

              <Text className="text-base leading-6 text-gray-700 my-4">
                Thank you for RSVPing to Rizom Collective's special event "Exploring the Future of Work & Play"! We're thrilled that you'll be joining us.
              </Text>

              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Event:</span> Exploring the Future of Work & Play
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span> Thursday, December 12, 2024
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Time:</span> 15:00 - 17:00
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Location:</span> 42 Workspace, Schiedamsevest 154, Rotterdam
                  </p>
                </div>
              </div>

              <Text className="text-base leading-6 text-gray-700 my-4">
                As a reminder, please feel free to bring a guest who shares your passion for shaping the future of work.
              </Text>

              <Text className="text-base leading-6 text-gray-700 mb-8">
                We look forward to welcoming you on December 12th.
              </Text>

              <hr className="border-gray-200 my-8" />

              <div className="text-gray-600">
                <p className="my-1">Best regards,</p>
                <p className="my-1">Arjanne Hoogstad</p>
                <p className="my-1 italic">On behalf of the Rizom Collective team</p>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
