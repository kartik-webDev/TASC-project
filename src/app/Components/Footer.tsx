'use client'
import React from "react"
import Link from "next/link"

const Footer = () => {


    return (
        <footer className="px-6 pt-8 bg-black md:px-16 lg:px-36 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <p className="mt-6 text-sm">
                        TASC is a web application dedicated to prioritizing passenger safety, comfort, and choice in ride services.

                    </p>
             
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">TASC</h2>
                        <ul className="text-sm space-y-2">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/guidelines">Guidleines</Link></li>
                            <li><Link href="/feedback">Feedback</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91 1234567890</p>
                            <p>contact@tasc.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-sm pb-5">Made with
                <span className="text-red-500">❤</span>
                by Kartik
            </p>

            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © TASC. All Right Reserved.
            </p>

        </footer>
    )
}

export default Footer