
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import AppLayout from "@/components/AppLayout";
import DialogManager from "@/components/DialogManager";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const MyDownloads = () => {
  const { theme } = useTheme();
  const { downloads } = useDownloadHistory();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>My Downloads | SoftBare Video Downloader</title>
      </Helmet>
      <DialogManager>
        {({ openNewsletter, openContact, openSettings }) => (
          <AppLayout 
            onOpenNewsletter={openNewsletter}
            onOpenContact={openContact}
            downloadsCount={downloads.length}
          >
            <div className="h-full flex flex-col">
              {/* Header with back button and title */}
              <div className="flex items-center justify-between mb-4 p-2">
                <Button 
                  variant="highContrast"
                  className="app-wide-button-high-contrast" 
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h2 className="text-xl font-medium">My Downloads</h2>
                <div className="w-[100px]"></div> {/* Spacer for balance */}
              </div>
              
              {/* Main content area */}
              <div className="flex-1 overflow-auto">
                {downloads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-lg">No downloads yet</p>
                    <p className="text-sm opacity-70">Downloaded videos will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-2 p-2">
                    {downloads.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3 rounded-lg border bg-card"
                      >
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm opacity-70">
                          Downloaded on {new Date(item.downloadDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AppLayout>
        )}
      </DialogManager>
    </>
  );
};

export default MyDownloads;
