import { FiTrendingUp, FiStar, FiShoppingBag } from 'react-icons/fi';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="text-center mb-16 fade-in">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Welcome to <span className="text-gradient">StyleMe</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover your perfect style with AI-powered fashion recommendations tailored just for you.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
                    <FiTrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Trending Styles</h3>
                    <p className="text-gray-600">
                        Stay ahead of fashion trends with our constantly updated collection.
                    </p>
                </div>

                <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
                    <FiStar className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Personalized Picks</h3>
                    <p className="text-gray-600">
                        Get recommendations based on your unique style preferences.
                    </p>
                </div>

                <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
                    <FiShoppingBag className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Color Analysis</h3>
                    <p className="text-gray-600">
                        Discover which colors complement you best with our color matching technology.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 text-center fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your style?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Join thousands of users who have transformed their wardrobe with StyleMe.
                </p>
                <button className="btn btn-primary px-6 py-3 text-lg">
                    Get Started Now
                </button>
            </div>
        </div>
    );
};

export default Home;