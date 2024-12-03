import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const getStaticProps = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            cache: 'force-cache'
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
}

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export default async function Home() {
    const products = await getStaticProps();
    console.log(products);

    return (
        <main className="w-full h-full bg-neutral-800 opacity-90 p-6 rounded-xl flex flex-col gap-6">
            <section className="w-full h-20 flex bg-black rounded-xl items-center justify-center text-white text-xl font-semibold">
                Product List
            </section>
            <section className="w-full h-full bg-black rounded-xl text-white px-5 py-4 overflow-x-auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="product table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Nama</TableCell>
                                <TableCell>Harga</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.length > 0 ? (
                                products?.map((p: IProduct, i: number) => (
                                    <TableRow key={i} sx={{ '&:hover': { backgroundColor: '#424242' } }}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{p?.title}</TableCell>
                                        <TableCell>${p?.price?.toLocaleString('en-US')},00</TableCell>
                                        <TableCell>{p?.rating?.rate}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ padding: '6px 16px', fontWeight: 'bold' }}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body1">Gagal memuat produk!</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </main>
    );
}
