export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ 親の layout と loading を継承しない
  return <>{children}</>;
}
