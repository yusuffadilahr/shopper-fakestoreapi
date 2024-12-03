import Image from "next/image";

interface IPropsCardProduct { itemName: string, imageUrl: string, itemCategory: string, itemPrice: string }
export default function CardProduct({ itemName, imageUrl, itemCategory, itemPrice }: IPropsCardProduct) {
    return (
        <div className="h-fit w-full transition-all duration-75 hover:scale-105 bg-white">
            <div className="w-full md:h-[204px] lg:h-[340px] flex items-center justify-center">
                <Image
                    loading="lazy"
                    width={500}
                    height={500}
                    alt="product"
                    src={imageUrl}
                    className="md:w-full md:h-[204px] lg:h-[340px] lg:w-full object-cover"
                />
            </div>
            <div className="text-black flex flex-col items-center py-2">
                <div className="text-xs">
                    <h1 className="text-neutral-500">{itemCategory}</h1>
                </div>
                <h1 className="text-sm text-neutral-800 font-bold">{itemName}</h1>
                <h1 className="text-sm">${itemPrice}</h1>
            </div>
        </div>
    );
}