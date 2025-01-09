// src/app/wallet/[address]/page.tsx
'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import WalletSearch from '@/components/WalletSearch';

// src/app/wallet/[address]/page.tsx

const SearchWalletsPage = () => {
    const params = useParams();
    const address =
        typeof params.address === 'string'
            ? decodeURIComponent(params.address)
            : '';

    return (
        <div>
            <WalletSearch initialAddress={address} />
        </div>
    );
};

export default SearchWalletsPage;
