export default function SuccessPage({
  searchParams: { reference }
}: {
  searchParams: { reference: string }
}) {
  return (
    <main>
      <h1 className="my-8 text-center text-3xl font-bold">
        Successfully purchased Credits
      </h1>

      {/* show what you bought (from database), and have a refresh button if the order is not complete */}
      <p className="text-center font-black">REF: {reference}</p>
    </main>
  )
}
