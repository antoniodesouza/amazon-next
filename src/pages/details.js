import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faArrowLeft,
    faStar,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Layout from '~/layout';
import api from '~/services/api';
import Button from '~/components/Button';

export default function Details({ product, error }) {
    const stars = useMemo(() => {
        const initial = [];
        for (let i = 1; i < product.stars; i++) {
            initial.push(
                <FontAwesomeIcon
                    key={i}
                    size="lg"
                    className="w-5"
                    icon={faStar}
                    color="#e69d3f"
                />
            );
        }
        return initial;
    }, [product.stars]);
    return (
        <Layout>
            <div
                className={`product-details h-screen px-12 py-8 flex flex-col ${error &&
                    'justify-center items-center'}`}
            >
                {error ? (
                    <span className="text-xl text-center">
                        {' '}
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            color="red"
                        />{' '}
                        There was an error while consulting the products{' '}
                    </span>
                ) : (
                    <div className="flex flex-col lg:grid grid-cols-2 h-full py-12 lg:py-0">
                        <div className="h-full">
                            <Link href="/">
                                <div className="cursor-pointer mb-5 lg:mb-0 shadow rounded-full text-gray-500 w-12 h-12 flex items-center justify-center p-8">
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        size="lg"
                                    />
                                </div>
                            </Link>
                            <img
                                src={product.image}
                                alt={product.name}
                                aria-label={product.name}
                                title={product.name}
                                className="lg:my-12 mx-0"
                            />
                        </div>
                        <div className="h-full flex flex-col justify-between">
                            <header>
                                <h1 className="text-2xl mb-2 text-gray-800 font-bold">
                                    {product.name}
                                </h1>
                                <div className="flex flex-row">
                                    {stars}{' '}
                                    <span className="ml-2 font-light text-yellow-burn">
                                        1540 reviews
                                    </span>
                                </div>
                                <p className="text-md text-gray-500 mt-8">
                                    This is a huge description
                                </p>
                            </header>
                            <footer className="flex flex-col lg:flex-row w-full justify-between lg:px-8 px-0 py-5">
                                <div className="flex flex-col">
                                    <span className="text-gray-500">
                                        Best price
                                    </span>
                                    <strong className="text-3xl text-gray-800">
                                        $4564
                                    </strong>
                                </div>

                                <div className="flex flex-row items-center mt-5 lg:mt-0">
                                    <Button
                                        className="font-bold text-xl px-12"
                                        title="Add to cart"
                                    >
                                        {' '}
                                        Add to cart
                                    </Button>
                                    <button
                                        className="ml-5 border-none bg-none"
                                        type="button"
                                        title="Save to my list"
                                    >
                                        <FontAwesomeIcon
                                            size="lg"
                                            icon={faHeart}
                                            className="text-blue-500"
                                        />
                                    </button>
                                </div>
                            </footer>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

Details.getInitialProps = async ({ query }) => {
    const { productId } = query;

    try {
        const response = await api.get(`/products/${productId}`);
        console.log(response);
        return { product: response.data };
    } catch (err) {
        return { error: { message: 'Product not found', data: err } };
    }
};

Details.defaultProps = {
    error: null,
};

Details.propTypes = {
    product: PropTypes.shape().isRequired,
    error: PropTypes.shape(),
};
