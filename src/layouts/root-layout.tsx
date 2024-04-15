"use client";

// i18n
import "@/locales/i18n";

// scrollbar
import "simplebar-react/dist/simplebar.min.css";

// lightbox
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// editor
import "react-quill/dist/quill.snow.css";

// carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// image
import "react-lazy-load-image-component/src/effects/blur.css";

import { MotionLazy } from "@/components/animate/motion-lazy";
import { SettingsDrawer, SettingsProvider } from "@/components/settings";
import { SnackbarProvider } from "@/components/snackbar";
import { LocalizationProvider } from "@/locales";
import ThemeProvider from "@/theme";
import ProgressBar from "@/components/progress-bar/progress-bar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: "dark", // 'light' | 'dark'
          themeDirection: "ltr", //  'rtl' | 'ltr'
          themeContrast: "default", // 'default' | 'bold'
          themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                {children}
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </SettingsProvider>
    </LocalizationProvider>
  );
}
