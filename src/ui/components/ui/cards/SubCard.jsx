import { useTheme } from '@emotion/react'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { forwardRef } from 'react'

export const SubCard = forwardRef(
    (
        {
            children,
            content,
            contentClass,
            darkTitle,
            secondary,
            sx = {},
            contentSX = {},
            title,
            backgroundImage,
            className,
            ...others
        },
        ref
    ) => {
        const theme = useTheme()

        return (
            <Card
                ref={ref}
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.primary.light,
                    ':hover': {
                        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                    },
                    borderRadius:3,

                    background: backgroundImage && `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,  // Set background image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    ...sx
                }}
                {...others}>
                {/* card hearder and action */}
                {!darkTitle && title &&
                    <CardHeader
                        sx={{ p: 2.5 }}
                        title={<Typography
                            variant='h5'>
                            {title}
                        </Typography>}
                        action={secondary} />
                }
                {darkTitle && title &&
                    <CardHeader
                        sx={{ p: 2.5 }}
                        title={<Typography
                            variant='h4'>
                            {title}
                        </Typography>}
                        action={secondary} />
                }

                {/* content & header divider */}
                {title && (
                    <Divider sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                    />
                )}

                {/* card content */}
                {content && (
                    <CardContent sx={{ p: 2.5, ...contentSX }}
                        className={className || ''}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        )
    }
)