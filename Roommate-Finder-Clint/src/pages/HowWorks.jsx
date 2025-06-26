import { FaUserCircle, FaSearch, FaComments } from 'react-icons/fa';
import { MdPlayCircle, MdVerified, MdSecurity } from 'react-icons/md';
import { useTheme } from "../hooks/use-theme";

const HowWorks = () => {
    const { theme } = useTheme();

    const steps = [
        {
            icon: <FaUserCircle className="text-5xl text-[#3289c9]" />,
            title: "Create Your Profile",
            description: "Sign up and create your detailed profile including your preferences, lifestyle, and what you're looking for in a roommate.",
            features: [
                "Set your budget range",
                "Specify preferred locations",
                "Describe your lifestyle",
                "Upload profile photo"
            ]
        },
        {
            icon: <FaSearch className="text-5xl text-[#3289c9]" />,
            title: "Browse & Post",
            description: "Search through available listings or create your own post to find the perfect roommate match.",
            features: [
                "Advanced search filters",
                "View verified profiles",
                "Post your own listing",
                "Save favorite matches"
            ]
        },
        {
            icon: <FaComments className="text-5xl text-[#3289c9]" />,
            title: "Connect & Finalize",
            description: "Chat with potential roommates, schedule meetings, and finalize your living arrangement.",
            features: [
                "Secure messaging system",
                "Schedule viewings",
                "Verify compatibility",
                "Finalize agreements"
            ]
        }
    ];

    const benefits = [
        {
            icon: <MdVerified className="text-4xl text-[#3289c9]" />,
            title: "Verified Profiles",
            description: "All users go through our verification process for your safety"
        },
        {
            icon: <MdSecurity className="text-4xl text-[#3289c9]" />,
            title: "Secure Platform",
            description: "Your data and communications are protected"
        },
        {
            icon: <MdPlayCircle className="text-4xl text-[#3289c9]" />,
            title: "Easy to Use",
            description: "Simple, intuitive interface for seamless experience"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
                    How RoommateFinder Works
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Find your perfect roommate in three simple steps
                </p>
            </div>

            {/* Steps Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {steps.map((step, index) => (
                    <div key={index} className={`relative p-6 ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
                        <div className={`absolute -top-5 left-6 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                        } p-2 rounded-lg shadow-md`}>
                            {step.icon}
                        </div>
                        <div className="mt-8">
                            <h3 className={`text-xl font-bold mb-3 ${
                                theme === 'dark' ? 'text-white' : ''
                            }`}>
                                Step {index + 1}: {step.title}
                            </h3>
                            <p className={`mb-4 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>{step.description}</p>
                            <ul className="space-y-2">
                                {step.features.map((feature, idx) => (
                                    <li key={idx} className={`flex items-center text-sm ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        <span className="w-2 h-2 bg-[#3289c9] rounded-full mr-2"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Benefits Section */}
            <div className={`${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            } rounded-xl p-8`}>
                <h2 className={`text-2xl font-bold text-center mb-8 ${
                    theme === 'dark' ? 'text-white' : ''
                }`}>Why Choose RoommateFinder?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className={`text-center p-6 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                        } rounded-lg shadow-md`}>
                            <div className="flex justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${
                                theme === 'dark' ? 'text-white' : ''
                            }`}>{benefit.title}</h3>
                            <p className={`${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowWorks;