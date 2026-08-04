'use client'
import { MaterialDesignContent, SnackbarProvider } from 'notistack'

export default function SnackBar({ children }: { children: React.ReactNode }) {

    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            style={{
                borderRadius: 16,
                boxShadow:
                    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            }}
        >
            {children}
        </SnackbarProvider>
    )
}
