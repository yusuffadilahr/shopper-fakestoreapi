import CardProduct from "@/components/cardProduct"
import Link from "next/link"

const getStaticProps = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      cache: 'force-cache'
    })

    return response.json()
  } catch (error) {
    console.log(error)
  }
}

interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number,
    count: number
  }
}

export default async function Home() {
  const products = await getStaticProps()
  console.log(products)

  return (
    <main className="w-full h-fit p-5 bg-neutral-200">
      <section className="flex w-full justify-center items-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4">
          {products?.map((p: IProduct, i: number) => (
            <Link href={'/'} key={i}>
              <CardProduct
                itemPrice={p?.price?.toString()}
                imageUrl={p?.image}
                itemCategory={p?.category}
                itemName={p?.title}
              />
            </Link>
          ))}
        </div>
      </section>
      <h1>HOME PAGE</h1>
    </main>
  );
}