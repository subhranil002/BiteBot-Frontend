import { FaFilter } from "react-icons/fa";

import ChatInterface from "../../components/chatbot/ChatInterface";
import HomeLayout from "../../layouts/HomeLayout";

const Chat = () => {
    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-300 to-primary/5">
                <div className="container mx-auto px-4 py-6 h-[calc(100vh-8rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                        <div className="lg:col-span-3 bg-base-100 border rounded-xl shadow overflow-hidden">
                            <div className="border-b p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                            Recipe Chat
                                        </h1>
                                        <p className="text-gray-400 mt-1">
                                            Ask me anything about cooking and
                                            recipes!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[calc(100%-5rem)]">
                                <ChatInterface />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Chat;
