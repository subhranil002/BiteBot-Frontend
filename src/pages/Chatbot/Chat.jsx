import { FaFilter } from "react-icons/fa";

import ChatInterface from "../../components/chatbot/ChatInterface";
import HomeLayout from "../../layouts/HomeLayout";

const Chat = () => {
    return (
        <HomeLayout>
          <div className="min-h-screen bg-base-100">
            <div className="container mx-auto p-6 h-[calc(100vh-8rem)]">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <div className="lg:col-span-3 card bg-base-100 border rounded-xl shadow-lg overflow-hidden">
                  
                  {/* Header */}
                  <div className="card-body p-6 bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Recipe Chat
                        </h1>
                        <p className="text-gray-400 mt-1">
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
