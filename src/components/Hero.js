import React from 'react'

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=600)"
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-[60%]">
                    <h1 className="mb-5 text-5xl font-bold">AnaSpice – Adding flavor to your doorstep.</h1>
                    <p className="mb-5">
                    brings your favorite meals straight to your door with quick, reliable, and convenient delivery. Browse through diverse menus, customize your orders, and enjoy fresh, 
                    <br />
                    delicious food anytime, anywhere. Perfect for busy schedules, last-minute cravings, or a cozy night in!
                    </p>
                    <button className="btn btn-primary bg-blue-600 border-0 w-[30%] duration-300 hover:translate-x-3 rounded-full">Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default Hero