export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ 親の layout を継承しないため loading.tsx も継承されない
  return <>{children}</>;
}
