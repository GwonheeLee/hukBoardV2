import { getCalendar } from "@/utils/calendar";

export default function Home() {
  getCalendar("2023-06-22");
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-main-color sm:text-5xl">
          We are Hurry up Korea
        </h1>
        <p className="mt-4 text-base text-main-color/70 sm:mt-6">OkJa</p>
      </div>
    </section>
  );
}
