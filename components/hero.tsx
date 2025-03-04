export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center py-8">
      <h1 className="uppercase"><span className="text-red-600">BP & Glucose</span>Charting</h1>
      <p className="text-3xl uppercase lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
       Monitor & chart your BP & Glucose levels
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
