import React from 'react';
import axios from 'axios';
import SessionCheck from '@/pages/components/sessionCheck';

function Products({ products }) {
    return (
        <>
        <SessionCheck/>
            {console.log(products)}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto bg-gradient-to-b from-zinc-50 to-blue-100">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Product Showcase</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-xl">Explore our amazing products.</p>
                    </div>
                    <div className="flex flex-wrap -m-4 ">
                        {products.map((product) => (
                            <div key={product.id} className="xl:w-1/4 md:w-1/2 p-4">
                                <div className="bg-gray-100 p-6 shadow-md hover:shadow-lg hover:shadow-black cursor-pointer rounded-lg">
                                    {console.log(product.image)}
                                    <div className='flex items-center text-center'>
                                    <img className="h-48 rounded w-full object-center mb-6" src={"http://localhost:3000/users/getProductImage/" + product.image}
                                        alt={product.name} />
                                        </div>
                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Availability</h3>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{product.name}</h2>
                                    <p className="text-gray-700 mb-2">${product.price}</p>
                                    <p className={`text-${product.isAvailable === 'yes' ? 'blue' : 'red'}-500 text-sm font-semibold`}>
                                        {product.isAvailable === 'yes' ? 'Available' : 'Not Available'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:3000/users/products');
        const products = response.data;
        return { props: { products } };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { props: { products: [] } };
    }
}

export default Products;
