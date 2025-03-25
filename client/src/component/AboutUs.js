import React from 'react';

const AboutMe = () => {
    return (
        <div className="bg-gray-100 py-6 sm:py-10 px-4 sm:px-6 bg-gradient-to-r from-black to-[#152246] mb-16" id="about">
            <div className="bg-gray-200 shadow-2xl rounded-lg p-6 sm:p-8 max-w-4xl w-full mx-auto mt-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-customPurple">
                    About Me
                </h2>
                
                <p className="text-gray-700 leading-relaxed text-sm lg:text-lg">
                    Hey there! I'm <span className="font-semibold">Somesh Raju</span>, the creator behind this blog. 
                    As a <span className="font-semibold">developer, writer, and tech enthusiast</span>, I am passionate about 
                    sharing insights, experiences, and knowledge with the world.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm lg:text-lg mt-4">
                    This blog is a space where I document my learnings, thoughts, and experiences—from coding tutorials 
                    to industry trends. You can also share your thoughts, and experiences by creating blogs. Whether you're a developer, a tech enthusiast, or just curious about software, I hope you find 
                    something valuable here. 
                </p>

                <p className="text-gray-700 leading-relaxed text-sm lg:text-lg mt-4">
                    Thanks for stopping by! Feel free to connect with me—let’s learn and grow together.
                </p>

                {/* Personal Profile Section */}
                <div className="mt-8 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold">Meet the Creator</h3>
                    <p className="text-gray-600 mt-2">The person behind this blog:</p>

                    {/* Profile Image */}
                    <div className="flex justify-center mt-4">
                        <img 
                            src="/me3.png" 
                            alt="Somesh Raju" 
                            className="w-20 h-20 sm:w-32 sm:h-32 rounded-full shadow-lg border-2 border-customPurple"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
