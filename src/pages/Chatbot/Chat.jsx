import { FaFilter } from "react-icons/fa";

import ChatInterface from "../../components/chatbot/ChatInterface";
import HomeLayout from "../../layouts/HomeLayout";

const Chat = () => {
    return (
        <HomeLayout>
          <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
            <div className="container mx-auto p-6 h-[calc(100vh-8rem)] justify-center items-center">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-3 card border border-orange-100 rounded-2xl shadow-xl overflow-hidden flex flex-col bg-white/80 backdrop-blur-md">
                  
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-orange-100 to-amber-100 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
                          Recipe Chat
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                          Ask me anything about cooking and recipes!
                        </p>
                      </div>
                    </div>
                  </div>
      
                  {/* Chat */}
                  <div className="card-body p-0 h-[calc(100%-5rem)]">
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
