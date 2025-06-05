import { Html, Head, Font, Preview, Heading, Row, Section, Text } from "@react-email/components";

interface VerifictionEmailProps {
    username: string,
    otp: string,
};


export default function verifictionEmail({ username, otp }: VerifictionEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verifiction Code</title>
                <Font fontFamily="Roboto" fallbackFontFamily="Verdana" />
            </Head>
            <Preview>Here&apos;s your verifiction code:{otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. please use the following verifiction code to complete your registeration
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>if you did note request this code, please ignore this email.</Text>
                </Row>
            </Section>
        </Html>
    )
}