import React, { useState } from 'react';
import './main.css'

import Cards from '../cards/cards';


export default function Main() {

    return (
        <main className='main'>
            <section className='cards'>
                <Cards />
            </section>
        </main>
    )
}