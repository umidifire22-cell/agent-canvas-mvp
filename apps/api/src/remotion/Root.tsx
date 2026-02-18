import React from 'react';
import { Composition } from 'remotion';
import { SocialPost } from './templates/SocialPost';
import { z } from 'zod';
import { brandKitSchema } from '../core/schemas';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="SocialPost"
                component={SocialPost}
                durationInFrames={1}
                fps={30}
                width={1080}
                height={1080}
                defaultProps={{
                    title: 'Hello AgentCanvas',
                    image: 'https://via.placeholder.com/600',
                    brandKit: {
                        colors: {
                            primary: '#FF5733',
                            secondary: '#333333',
                            background: '#FFFFFF',
                            accent: '#00D1FF'
                        },
                        typography: {
                            headingFont: 'Inter',
                            bodyFont: 'Roboto'
                        }
                    }
                }}
            />
        </>
    );
};
