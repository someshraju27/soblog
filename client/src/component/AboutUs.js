import React from 'react';

const AboutMe = () => {
    return (
        <div className="bg-gradient-to-r from-black to-[#152246] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-16" id="about">
            <div className="bg-gray-200 shadow-2xl rounded-lg p-6 sm:p-10 lg:p-12 max-w-4xl w-full mx-auto mt-8 sm:mt-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-customPurple">
                    About Me
                </h2>
                
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                        Hey there! I'm <span className="font-semibold">Somesh Raju</span>, the creator behind this blog. 
                        As a <span className="font-semibold">developer, writer, and tech enthusiast</span>, I am passionate about 
                        sharing insights, experiences, and knowledge with the world.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                        This blog is a space where you can also share your thoughts, and experiences by creating blogs. Whether you're a developer, a tech enthusiast, or just curious about software, I hope you find 
                        something valuable here. 
                    </p>

                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                        Thanks for stopping by! Feel free to connect with me—let's learn and grow together.
                    </p>
                </div>

                {/* Personal Profile Section */}
                <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Meet the Creator</h3>
                    <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">The person behind this blog:</p>

                    {/* Profile Image */}
                    <div className="flex justify-center mt-4 sm:mt-6">
                        <img 
                            src="/me3.png" 
                            alt="Somesh Raju" 
                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full shadow-lg border-2 border-customPurple object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
