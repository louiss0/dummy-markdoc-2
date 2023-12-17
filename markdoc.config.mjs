import {
    component, defineMarkdocConfig, nodes
} from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';
import { z } from 'astro/zod';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

const {
    nodes:markdocHTMLTagSchemasNodes,
    tags: { dl,
        ...restTags
    }
} = markdocHTMLTagSchemas({
    strictHeadings: true
});



export default defineMarkdocConfig(
    {

        extends: [
            shiki({
                theme: "material-theme-palenight",
            })
        ],
        nodes: {
          ...markdocHTMLTagSchemasNodes,  
          heading: {
                ...nodes.heading,
                render: component("./src/components/markdoc/Heading.astro")
            },
        },
        tags: {
            callout: {
                render: component("./src/components/markdoc/Callout.astro"),
                attributes: {
                    title: {
                        type: String,
                        validate(value) {

                            const titleSchema =
                                z.string().max(60).min(10)
                                    .refine((value) => /\s/gm.test(value), { message: "Space your titles and make sure they are more than a word" })
                            try {

                                titleSchema.parse(value)
                            } catch (error) {

                                if (error instanceof ZodError) {

                                    return [
                                        {
                                            id: "invalid-value",
                                            message: error.message,
                                            level: "warning",


                                        }
                                    ]

                                }

                            }

                            return []

                        }
                    },
                    type: {
                        type: String,
                        default: "info",
                        errorLevel: "warning",
                        matches: ['info', 'tip', 'warning', 'danger']
                    },
                }
            },
            dl: {
                render: component("./src/components/markdoc/DefinitionList.astro"),
                attributes: dl.attributes,
                children: dl.children,
            },
            ...restTags
        },

    }
)