'use client'
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './components/header';

export default function Home() {
  return (
    <>
      <Head>
        <title>TerraGUI</title>
        <meta
          name="description"
          content="Design your cloud infrastructure visually with TerraGUI."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isHomePage={true}/>
      <main className="overflow-hidden">
        <section className="flex flex-wrap items-center p-8 min-h-[80vh] bg-gradient-to-br from-[#F7F4FA] to-white">
          <div className="flex-1 min-w-[400px] max-w-[500px] z-10">
            <h1 className="text-4xl font-extrabold font-nunito mb-4 text-[#2D2D2D]">
              Design Your Cloud Infrastructure Visually.
            </h1>
            <p className="text-lg mb-8 font-normal text-[#2D2D2D]">
              From drag-and-drop components to Terraform-ready files in minutes.
            </p>
            <Link href="/design">
              <button className="bg-gradient-to-r from-[#6A4C93] to-[#8C66B9] text-white border-none px-6 py-3 rounded-lg cursor-pointer font-semibold text-base">
                Start Designing
              </button>
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 px-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 font-nunito text-[#2D2D2D]">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            <div className="text-center p-8 border border-[#EEE] rounded-lg bg-[#FAF9FC]">
              <div className="text-4xl mb-4">🎛</div>
              <h3 className="font-nunito text-xl font-bold mb-2 text-[#2D2D2D]">
                Visual Canvas
              </h3>
              <p className="text-base text-[#555] leading-relaxed">
                Build infrastructure by dragging and dropping your favorite cloud components.
              </p>
            </div>
            <div className="text-center p-8 border border-[#EEE] rounded-lg bg-[#FAF9FC]">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-nunito text-xl font-bold mb-2 text-[#2D2D2D]">
                Instant Terraform
              </h3>
              <p className="text-base text-[#555] leading-relaxed">
                Generate Terraform files on the fly, ready for deployment.
              </p>
            </div>
            <div className="text-center p-8 border border-[#EEE] rounded-lg bg-[#FAF9FC]">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="font-nunito text-xl font-bold mb-2 text-[#2D2D2D]">
                Cloud-Agnostic
              </h3>
              <p className="text-base text-[#555] leading-relaxed">
                Work seamlessly with AWS, GCP, Azure, and more.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

