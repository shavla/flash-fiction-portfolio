import Image from "next/image";

export default function Flag({ src, label }: { src: string; label: string }) {
  return (
    <>
      <Image src={src} alt="" width={24} height={24} loading="eager" />
      <span className="text-sm font-medium">{label}</span>
    </>
  );
}
