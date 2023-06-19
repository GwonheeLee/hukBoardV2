import MemberForm from "@/components/MemberForm";

type Props = {
  params: {
    email: string;
  };
};

export default function MemberDetailPage({ params: { email } }: Props) {
  return (
    <section className="w-full">
      <MemberForm email={decodeURIComponent(email)} />
    </section>
  );
}
