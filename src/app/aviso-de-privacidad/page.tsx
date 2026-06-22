import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de SICAMET conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: false, follow: true },
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <PageHero
        title="Aviso de Privacidad"
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Aviso de Privacidad", href: "/aviso-de-privacidad" },
        ]}
      />
      <section className="pb-16">
        <Container>
          <div className="prose prose-zinc max-w-3xl dark:prose-invert prose-headings:font-display">
            <h2>Responsable de la protección de sus datos</h2>
            <p>
              <strong>
                Sistemas Integrales de Calibración y Aseguramiento Metrológico,
                S.A. de C.V.
              </strong>
              , con domicilio en Juan Aldama Sur #1135, Col. Universidad, Toluca,
              Estado de México, es responsable del uso y protección de sus datos
              personales, en términos de la Ley Federal de Protección de Datos
              Personales en Posesión de los Particulares.
            </p>

            <h2>Datos personales que recabamos</h2>
            <p>
              Recabamos los datos personales que usted manifiesta en los
              documentos proporcionados para la prestación de nuestros servicios,
              así como los que nos comparte a través de nuestros formularios de
              contacto y del Centro de Quejas.
            </p>

            <h2>Finalidades del tratamiento</h2>
            <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
            <ul>
              <li>
                Proveer los servicios de calibración, capacitación, medición,
                calificación y validación que ha solicitado.
              </li>
              <li>
                Informarle sobre el avance y las necesidades durante la
                prestación de los mismos.
              </li>
              <li>Evaluar la calidad del servicio que le brindamos.</li>
              <li>
                Dar cumplimiento a lo señalado en la Ley de Infraestructura de la
                Calidad.
              </li>
            </ul>

            <h2>Transferencia de datos</h2>
            <p>
              Sus datos personales no pueden ser transferidos ni tratados por
              personas ajenas a Sistemas Integrales de Calibración y Aseguramiento
              Metrológico, S.A. de C.V. En este sentido, su información no será
              compartida con terceros.
            </p>

            <h2>Derechos ARCO</h2>
            <p>
              Usted tiene derecho a acceder, rectificar y cancelar sus datos
              personales, así como a oponerse al tratamiento de los mismos o
              revocar el consentimiento que para tal fin nos haya otorgado. Toda
              solicitud será atendida en un plazo máximo de{" "}
              <strong>20 días hábiles</strong>.
            </p>

            <h2>Contacto del responsable de datos</h2>
            <p>
              Para el ejercicio de sus derechos ARCO o cualquier duda sobre el
              tratamiento de sus datos, contacte a Ezequiel Eugenio Noguez Sáenz:
            </p>
            <ul>
              <li>
                Teléfono: <a href="tel:+527222701584">+52 722 270 1584</a>
              </li>
              <li>
                Correo:{" "}
                <a href="mailto:enoguez@sicamet.net">enoguez@sicamet.net</a>
              </li>
            </ul>

            <h2>Cambios al aviso de privacidad</h2>
            <p>
              El presente aviso de privacidad puede sufrir modificaciones derivadas
              de cambios legales o de nuestras propias necesidades. Cualquier
              cambio se publicará en este mismo medio.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
