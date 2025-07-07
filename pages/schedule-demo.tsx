import Head from 'next/head'
import { Header } from '../components/mmm/Header'
import { Container } from '../components/mmm/Container'

function ScheduleDemoPage() {
  return (
    <>
      <Head>
        <title>Schedule a Demo | Halliard</title>
        <meta
          name="description"
          content="See Halliard in action. Schedule a personalized demo to learn how our Marketing Mix Modeling platform can help you make better budget decisions."
        />
      </Head>
      <Header />
      <section className="pt-32 pb-20 bg-white">
        <Container className="text-center">
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
            Schedule Your Personalized Demo
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-700">
            We’d love to show you how Halliard can turn your MMM data into actionable growth recommendations. Pick a time that works for you below.
          </p>

          {/* Google Calendar Appointment Scheduling begin */}
          <div className="mt-12">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3FnvqgzK-aKgcTvNmT8Et-d6Xxi1a07hUF13ufKd6OtSjRf9tUJyuP73kyK7ysyI8jebXoLYMF?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
            />
          </div>
          {/* Google Calendar Appointment Scheduling end */}
        </Container>
      </section>
    </>
  )
}

(ScheduleDemoPage as any).disableNavbar = true;
(ScheduleDemoPage as any).fullWidth = true;
(ScheduleDemoPage as any).siteBg = true;

export default ScheduleDemoPage; 