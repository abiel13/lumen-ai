import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, Brain, ArrowRight, MessageSquare, Image as ImageIcon, Code } from "lucide-react";

export default async function LandingPage() {
    const user = await currentUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Lumen AI
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {user ? (
                                <Link href="/chat">
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                        Go to Chat
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/sign-in">
                                        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
                            <Zap className="w-4 h-4" />
                            Powered by Google Gemini AI
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Chat with{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Intelligence
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Experience the future of AI conversation. Get instant, intelligent responses
                            to your questions with our advanced AI assistant.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {user ? (
                                <Link href="/chat">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-6 h-auto">
                                        Start Chatting
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/sign-up">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-6 h-auto">
                                        Get Started Free
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            )}
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need for intelligent conversations
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Conversations</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Engage in natural, context-aware conversations with our advanced AI that understands nuance and intent.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Advanced AI</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Powered by Google Gemini, delivering intelligent responses with deep understanding and accuracy.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your conversations are protected with enterprise-grade security and privacy controls.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Image Generation</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Create stunning images from text descriptions with our integrated image generation capabilities.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Code Assistance</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get help with coding, debugging, and learning new programming languages and frameworks.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Experience instant responses with our optimized infrastructure for seamless conversations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Join thousands of users experiencing the future of AI conversations
                        </p>
                        {user ? (
                            <Link href="/chat">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                                    Go to Chat
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/sign-up">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                                    Start Free Today
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Lumen AI
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} Lumen AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

