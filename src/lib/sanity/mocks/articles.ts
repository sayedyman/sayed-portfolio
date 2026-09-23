import type { SanityArticle, SanityArticleDetail, SanitySlug } from '@/types'

export const mockAllArticles: SanityArticle[] = [
  {
    "_id": "5d27123d-b356-4aad-b246-4b554dbebef0",
    "category": "AI & Design ",
    "coverImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-2151e4380bd1a3312f7f1d7abba0809aeb3e779f-1536x1024-png",
        "url": "/og-image.png"
      }
    },
    "excerpt": "Do you think artificial intelligence will replace us in 2026 ? And what is the future for designers?",
    "featured": true,
    "featuredOrder": 1,
    "isEssay": true,
    "publishedAt": "2026-05-16T23:05:00.000Z",
    "readingTime": 9,
    "slug": {
      "_type": "slug",
      "current": "will-ai-replace-ux-designers-in-2026"
    },
    "status": "published",
    "tags": [
      "AI ",
      "Future ",
      "Design ",
      "Technology ",
      "Productivity"
    ],
    "title": "Will AI Replace UX Designers in 2026?"
  }
]

export const mockFeaturedArticles: SanityArticle[] = mockAllArticles.filter((a) => a.featured === true)

export const mockArticleDetails: SanityArticleDetail[] = [
  {
    "_id": "5d27123d-b356-4aad-b246-4b554dbebef0",
    "body": [
      {
        "_key": "bef3c9ad98b6",
        "_type": "block",
        "children": [
          {
            "_key": "93bc1e20c786",
            "_type": "span",
            "marks": [],
            "text": "Will AI Replace UX Designers? Or are we entering an era where the \"traditional designer\" disappears?"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "a503ee5b52c8",
        "_type": "block",
        "children": [
          {
            "_key": "9ef1922e3a05",
            "_type": "span",
            "marks": [],
            "text": "A lot of people are scared \nright now.\nAnd honestly, I get why.\nOpen LinkedIn, YouTube, or TikTok for five minutes and you'll probably see\nsomeone saying:\n\"I built a full product in 10 minutes with AI.\"\nThen another person says:\n\"You won’t need UI/UX designers anymore.\""
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "46d5dcb07029",
        "_type": "block",
        "children": [
          {
            "_key": "9ef1922e3a05",
            "_type": "span",
            "marks": [],
            "text": "At this point, I almost feel bad for the people making those claims, because most of them don’t actually understand what UX design is in the first place."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0afac15b53e2",
        "_type": "block",
        "children": [
          {
            "_key": "e77982a149e2",
            "_type": "span",
            "marks": [],
            "text": "They think UX is:\na few beautiful screens, some Auto Layout, a prototype, and that’s it.\nSo naturally, the moment they see AI generating attractive interfaces, they assume the designer is now useless.\nBut the problem is that they never understood what designers were solving to begin with.\n"
          },
          {
            "_key": "48fce0899a2b",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "UX was never just frames and colors"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b9e0f27d0e97",
        "_type": "block",
        "children": [
          {
            "_key": "1e45929f8847",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Real UX is understanding:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "9bf5bc8c46a6",
        "_type": "block",
        "children": [
          {
            "_key": "1e45929f8847",
            "_type": "span",
            "marks": [],
            "text": "Why the user is confused."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e4a16f53f9de",
        "_type": "block",
        "children": [
          {
            "_key": "1e45929f8847",
            "_type": "span",
            "marks": [],
            "text": "Why they dropped out of the flow."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4400b8c402d4",
        "_type": "block",
        "children": [
          {
            "_key": "1e45929f8847",
            "_type": "span",
            "marks": [],
            "text": "Why the product looks beautiful… but nobody actually uses it."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "46f467f9b67b",
        "_type": "block",
        "children": [
          {
            "_key": "1e45929f8847",
            "_type": "span",
            "marks": [],
            "text": "And honestly? AI still struggles with that part."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0fb4fb7f1a23",
        "_type": "block",
        "children": [
          {
            "_key": "23a4747703ca",
            "_type": "span",
            "marks": [],
            "text": "AI will replace some designers. Just probably not the ones who truly understand UX"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "49e17ad7c42b",
        "_type": "block",
        "children": [
          {
            "_key": "c878959bcc6e",
            "_type": "span",
            "marks": [],
            "text": "The designers most at risk are the ones whose entire workflow looked like this:\n\"Make me a nice-looking screen.\"\nOr copying Dribbble shots.\nOr rearranging components without understanding the problem behind them.\nYeah, that type of work is genuinely in danger.\nBecause the reality is that a huge part of production work is already changing\nin front of us.\nWireframes that used to take hours can now be generated in minutes.\nUI variations appear instantly.\nEven frontend code is starting to come out half-finished and surprisingly usable.\nAnd honestly, that "
          },
          {
            "_key": "c35c972847f5",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "is"
          },
          {
            "_key": "29664bcb78a4",
            "_type": "span",
            "marks": [],
            "text": " scary, especially for beginners.\nBecause one of the biggest conversations happening right now is not just that AI speeds up work.\nIt’s that AI might remove the stage people used to learn through.\nOne sentence I came across in an article called:\n"
          },
          {
            "_key": "666cfac7c375",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "\"Why AI Can’t Replace the Next Generation of Workers\""
          },
          {
            "_key": "f2322ccbbb5d",
            "_type": "span",
            "marks": [
              "accent"
            ],
            "text": "\n"
          },
          {
            "_key": "321fea650711",
            "_type": "span",
            "marks": [],
            "text": "really stuck with me:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "77a0c54f8ce2",
        "_type": "block",
        "children": [
          {
            "_key": "f1c351eb98ea",
            "_type": "span",
            "marks": [],
            "text": "\"You have a junior extinction.\""
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "5a2e543be217",
        "_type": "block",
        "children": [
          {
            "_key": "d3d27e3c51ca",
            "_type": "span",
            "marks": [],
            "text": "And honestly, that sentence is terrifying."
          },
          {
            "_key": "eb0323b66c9d",
            "_type": "span",
            "marks": [
              "accent",
              "highlight"
            ],
            "text": "\n"
          },
          {
            "_key": "50b6532c04e4",
            "_type": "span",
            "marks": [],
            "text": "Because entry-level work is often the first thing AI absorbs.\nA lot of companies are already reducing junior hiring because AI can handle\nmany repetitive tasks faster and cheaper.\nBut then an uncomfortable question appears:\nIf companies stop investing in juniors… where are future seniors supposed to come from?\n"
          },
          {
            "_key": "be5a805273ff",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Experience doesn’t fall from the sky :"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5fc433268965",
        "_type": "block",
        "children": [
          {
            "_key": "50b6532c04e4",
            "_type": "span",
            "marks": [],
            "text": "People learn through mistakes"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "53e5b5ca1f5d",
        "_type": "block",
        "children": [
          {
            "_key": "50b6532c04e4",
            "_type": "span",
            "marks": [],
            "text": "Through repetition"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b67bf873eec5",
        "_type": "block",
        "children": [
          {
            "_key": "50b6532c04e4",
            "_type": "span",
            "marks": [],
            "text": "Through real projects"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "419d1322ddce",
        "_type": "block",
        "children": [
          {
            "_key": "50b6532c04e4",
            "_type": "span",
            "marks": [],
            "text": "Through struggling"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ed335e695477",
        "_type": "block",
        "children": [
          {
            "_key": "63cee4a66fde",
            "_type": "span",
            "marks": [],
            "text": ""
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "bfd577b54401",
        "_type": "block",
        "children": [
          {
            "_key": "656cd162b9f9",
            "_type": "span",
            "marks": [],
            "text": "And maybe that’s the most dangerous long-term effect of AI so far.\nNot that it fully replaces humans.\nBut that it may cut off the path humans used to grow through."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f8e700ab6843",
        "_type": "block",
        "children": [
          {
            "_key": "70ebb11f9209",
            "_type": "span",
            "marks": [],
            "text": "AI knows "
          },
          {
            "_key": "141eb795eccb",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "how"
          },
          {
            "_key": "37d6b4d4b831",
            "_type": "span",
            "marks": [],
            "text": ". It still doesn’t understand "
          },
          {
            "_key": "d618576a4db4",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "why"
          },
          {
            "_key": "d388b4ead7b9",
            "_type": "span",
            "marks": [],
            "text": "."
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "775f37190c01",
        "_type": "block",
        "children": [
          {
            "_key": "2eb1599b71dc",
            "_type": "span",
            "marks": [],
            "text": "One sentence I heard in a YouTube video summed up the entire conversation for me:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "97e7c9ccd303",
        "_type": "block",
        "children": [
          {
            "_key": "e3d38614a094",
            "_type": "span",
            "marks": [],
            "text": "\"AI knows how. But it still doesn't know why.\""
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "78f7fc746aac",
        "_type": "block",
        "children": [
          {
            "_key": "bdf47308522c",
            "_type": "span",
            "marks": [],
            "text": "And honestly, that’s the whole difference.\nEven companies like Microsoft, Adobe, and Figma never introduced AI by saying:\n\"We’re replacing designers.\"\nWhat they’re trying to do is accelerate execution, not replace thinking.\nAnd that’s a massive distinction.\n"
          },
          {
            "_key": "f665a618cac3",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "AI is extremely good at:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e8b339991fca",
        "_type": "block",
        "children": [
          {
            "_key": "a1d715ac29ce",
            "_type": "span",
            "marks": [],
            "text": "generating initial ideas"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5c072dec1247",
        "_type": "block",
        "children": [
          {
            "_key": "668df0665a1a",
            "_type": "span",
            "marks": [],
            "text": "writing copy"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "69ecbf93ff6f",
        "_type": "block",
        "children": [
          {
            "_key": "13f6233007e4",
            "_type": "span",
            "marks": [],
            "text": "creating variations"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "057c96de7d12",
        "_type": "block",
        "children": [
          {
            "_key": "881453f5221f",
            "_type": "span",
            "marks": [],
            "text": "speeding up workflows"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "d21eade69aa4",
        "_type": "block",
        "children": [
          {
            "_key": "82eca9027074",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "But it still struggles with:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "82bfcd8ce134",
        "_type": "block",
        "children": [
          {
            "_key": "fe01d600641d",
            "_type": "span",
            "marks": [],
            "text": "understanding human emotion"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1dcd2947df77",
        "_type": "block",
        "children": [
          {
            "_key": "000fdbe3a139",
            "_type": "span",
            "marks": [],
            "text": "reading real user behavior"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "6bf15574b256",
        "_type": "block",
        "children": [
          {
            "_key": "ab01aae8a669",
            "_type": "span",
            "marks": [],
            "text": "making difficult design tradeoffs"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ffe32c89b2f0",
        "_type": "block",
        "children": [
          {
            "_key": "c4bb5561ca8a",
            "_type": "span",
            "marks": [],
            "text": "recognizing when the \"correct\" solution is actually wrong for users"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "324e2497b3b5",
        "_type": "block",
        "children": [
          {
            "_key": "c033d24f81d6",
            "_type": "span",
            "marks": [],
            "text": "And that’s the core of the job."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "3f37b77b05a5",
        "_type": "block",
        "children": [
          {
            "_key": "b43dbacb23bb",
            "_type": "span",
            "marks": [],
            "text": "The real threat isn’t AI."
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "39288c8254f6",
        "_type": "block",
        "children": [
          {
            "_key": "ed0b206a9977",
            "_type": "span",
            "marks": [],
            "text": "It’s another designer using AI better than you.\nI think this is the part most people underestimate.\nThe next generation of successful designers probably won’t be the ones making\nthe prettiest UI."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8b08cd52e692",
        "_type": "block",
        "children": [
          {
            "_key": "33d6c973395e",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "It’ll be the people who:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "2f29704a5014",
        "_type": "block",
        "children": [
          {
            "_key": "534a2f4a82af",
            "_type": "span",
            "marks": [],
            "text": "deeply understand users"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "d0d8631d7e31",
        "_type": "block",
        "children": [
          {
            "_key": "93b674d4f273",
            "_type": "span",
            "marks": [],
            "text": "think critically"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "6f480e004451",
        "_type": "block",
        "children": [
          {
            "_key": "41f15667aba7",
            "_type": "span",
            "marks": [],
            "text": "have strong taste"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8fd34da7283b",
        "_type": "block",
        "children": [
          {
            "_key": "9d4970934172",
            "_type": "span",
            "marks": [],
            "text": "solve problems well"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5f8bf852bc38",
        "_type": "block",
        "children": [
          {
            "_key": "dd4541894ffa",
            "_type": "span",
            "marks": [],
            "text": "know when "
          },
          {
            "_key": "cc2cc9df145b",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "not"
          },
          {
            "_key": "82e56c36b842",
            "_type": "span",
            "marks": [],
            "text": " to trust the output"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "88daa4fcd0a5",
        "_type": "block",
        "children": [
          {
            "_key": "adb8c873dc25",
            "_type": "span",
            "marks": [],
            "text": "Because if AI can already handle 80% of execution work, then companies may not need the same number of designers anymore."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "dcd2f30f39aa",
        "_type": "block",
        "children": [
          {
            "_key": "adb8c873dc25",
            "_type": "span",
            "marks": [
              "highlight"
            ],
            "text": "And honestly? That’s a fair concern."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c4cb6ee53169",
        "_type": "block",
        "children": [
          {
            "_key": "99d136ee6d73",
            "_type": "span",
            "marks": [],
            "text": "The problem isn’t the tools."
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "0f87ce391d16",
        "_type": "block",
        "children": [
          {
            "_key": "77e3a19f96d4",
            "_type": "span",
            "marks": [],
            "text": "It’s the value you bring. A lot of designers still believe their value comes from execution."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "7b30ada4e9cd",
        "_type": "block",
        "children": [
          {
            "_key": "b8524c03dc39",
            "_type": "span",
            "marks": [],
            "text": "Being fast in Figma."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e8248462abb2",
        "_type": "block",
        "children": [
          {
            "_key": "b8524c03dc39",
            "_type": "span",
            "marks": [],
            "text": "Building clean design systems."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "d52fef2967f4",
        "_type": "block",
        "children": [
          {
            "_key": "b8524c03dc39",
            "_type": "span",
            "marks": [],
            "text": "Creating polished UI."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "094643265786",
        "_type": "block",
        "children": [
          {
            "_key": "65c4d2ca4c38",
            "_type": "span",
            "marks": [],
            "text": "And yeah, those skills still matter.\nBut there’s a difficult question nobody wants to ask themselves:\nIf AI can do most of that in seconds…"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "cebbf7f685b5",
        "_type": "block",
        "children": [
          {
            "_key": "65c4d2ca4c38",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "what exactly is left that makes "
          },
          {
            "_key": "ddc4f921daeb",
            "_type": "span",
            "marks": [
              "em",
              "strong"
            ],
            "text": "you"
          },
          {
            "_key": "b65c2a327bda",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": " valuable?"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "2fd294bb8799",
        "_type": "block",
        "children": [
          {
            "_key": "cddcb4865207",
            "_type": "span",
            "marks": [],
            "text": "That’s where the market is changing.\nPeople are already building MVPs without talking to designers.\nDevelopers are generating interfaces with AI tools.\nEven product managers are experimenting with flows themselves."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "33ea8e01249a",
        "_type": "block",
        "children": [
          {
            "_key": "cddcb4865207",
            "_type": "span",
            "marks": [],
            "text": "Which means the competition is no longer just:\ndesigner vs designer.\nNow it’s:\n"
          },
          {
            "_key": "41407a350f59",
            "_type": "span",
            "marks": [
              "highlight"
            ],
            "text": "a thoughtful designer vs someone who simply knows how to use tools quickly."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ecf9ef3e8177",
        "_type": "block",
        "children": [
          {
            "_key": "cddcb4865207",
            "_type": "span",
            "marks": [],
            "text": "And over the next few years, that difference is going to become painfully obvious."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b137b47e70d9",
        "_type": "block",
        "children": [
          {
            "_key": "720e3bc711bc",
            "_type": "span",
            "marks": [],
            "text": "Without an idea, the computer is just a fast idiot."
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "ac1e4a4ad65e",
        "_type": "block",
        "children": [
          {
            "_key": "44c6a5aaece8",
            "_type": "span",
            "marks": [],
            "text": "I once heard a quote from George Lois, one of the legendary advertising creatives in New York:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8a838ca0be40",
        "_type": "block",
        "children": [
          {
            "_key": "358702c24ebc",
            "_type": "span",
            "marks": [],
            "text": "\"Without a creative idea in your head, the computer is just a high speed moron.\""
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "c8325467aa25",
        "_type": "block",
        "children": [
          {
            "_key": "93dbbef30678",
            "_type": "span",
            "marks": [],
            "text": "That quote honestly captures the entire AI conversation.\nBecause no matter how fast AI becomes…\nno matter how many designs, flows, or code snippets it generates…\nif there’s no real idea behind the work, then you’re just pressing buttons faster.\nOne thing I’ve noticed about most AI-generated designs is that they usually "
          },
          {
            "_key": "e7798e33e770",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "look"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c882dfa13bed",
        "_type": "block",
        "children": [
          {
            "_key": "93dbbef30678",
            "_type": "span",
            "marks": [],
            "text": "correct"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8067f7fda677",
        "_type": "block",
        "children": [
          {
            "_key": "93dbbef30678",
            "_type": "span",
            "marks": [],
            "text": "Clean"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "69119c9ac5e6",
        "_type": "block",
        "children": [
          {
            "_key": "93dbbef30678",
            "_type": "span",
            "marks": [],
            "text": "Organized"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "18afd6421911",
        "_type": "block",
        "children": [
          {
            "_key": "93dbbef30678",
            "_type": "span",
            "marks": [],
            "text": "Technically fine"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "912f9e4b3a39",
        "_type": "block",
        "children": [
          {
            "_key": "ad321f7553b7",
            "_type": "span",
            "marks": [],
            "text": "But also…\nkind of lifeless. Because AI is trained on averages.\nAnd averages rarely create memorable work."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "631a32fee18c",
        "_type": "block",
        "children": [
          {
            "_key": "c896c6c69615",
            "_type": "span",
            "marks": [],
            "text": "Another line I loved said:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1f45e557d126",
        "_type": "block",
        "children": [
          {
            "_key": "369e2b177269",
            "_type": "span",
            "marks": [],
            "text": "\"AI is good at tasks. But jobs still require human judgment and taste.\""
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "ddd0e3e7cd26",
        "_type": "block",
        "children": [
          {
            "_key": "571ead54e080",
            "_type": "span",
            "marks": [],
            "text": "That’s the difference between someone who knows how to use a tool…\nand someone who actually understands what they’re building and why.\nTaste matters more than ever now."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f0fa72a94923",
        "_type": "block",
        "children": [
          {
            "_key": "97dbf55fe3a5",
            "_type": "span",
            "marks": [],
            "text": "Being able to say:\n\"No. This isn’t the right solution.\""
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "1808057cc792",
        "_type": "block",
        "children": [
          {
            "_key": "5adc92f25d66",
            "_type": "span",
            "marks": [],
            "text": "Even when AI insists that it is."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "294f85218592",
        "_type": "block",
        "children": [
          {
            "_key": "0692cc808287",
            "_type": "span",
            "marks": [],
            "text": "The most dangerous thing AI can do to a designer"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "52195aabf925",
        "_type": "block",
        "children": [
          {
            "_key": "b4abb2e7d495",
            "_type": "span",
            "marks": [],
            "text": "AI is incredibly good at helping you reach bad ideas faster.\nAnd weirdly enough, that’s not always a bad thing.\nIf you truly understand design, AI becomes a massive accelerator.\nInstead of wasting a week testing 20 weak ideas, you can now explore them in an hour. But if you don’t have strong fundamentals?"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "a52f37bf16cd",
        "_type": "block",
        "children": [
          {
            "_key": "c03f51f3f74c",
            "_type": "span",
            "marks": [],
            "text": "Then you’ll probably assume the first AI output is the "
          },
          {
            "_key": "2dbede8e13ae",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "correct answer."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4821ef9f2785",
        "_type": "block",
        "children": [
          {
            "_key": "d992272f5641",
            "_type": "span",
            "marks": [],
            "text": "And honestly, that’s one of the most dangerous things that can happen to a designer.\nBecause the problem isn’t that AI is wrong"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "8eb4e96a3dea",
        "_type": "block",
        "children": [
          {
            "_key": "d992272f5641",
            "_type": "span",
            "marks": [],
            "text": "The problem is that you stopped thinking for yourself."
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "724b748fdc58",
        "_type": "block",
        "children": [
          {
            "_key": "a24bc974e46f",
            "_type": "span",
            "marks": [],
            "text": "So how do you stay valuable in the AI era?"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "19962c1b891b",
        "_type": "block",
        "children": [
          {
            "_key": "690a74c52a5e",
            "_type": "span",
            "marks": [],
            "text": "I don’t think the important question anymore is:\n\"Will the industry die?\""
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "dd89000a8612",
        "_type": "block",
        "children": [
          {
            "_key": "83ccca59f67f",
            "_type": "span",
            "marks": [],
            "text": "The real question is:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "d8f52a5ecf62",
        "_type": "block",
        "children": [
          {
            "_key": "908ea95c43f6",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "How do you stay valuable when almost anyone can generate polished UI with a few prompts?"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "95b8b6424fdb",
        "_type": "block",
        "children": [
          {
            "_key": "733b53e7cd24",
            "_type": "span",
            "marks": [],
            "text": "Years ago, you could stand out just by:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ef4894a0baaa",
        "_type": "block",
        "children": [
          {
            "_key": "dd30c8c27295",
            "_type": "span",
            "marks": [],
            "text": "knowing a tool better"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "fcae6844fbab",
        "_type": "block",
        "children": [
          {
            "_key": "6611ad4c510e",
            "_type": "span",
            "marks": [],
            "text": "designing cleaner screens"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "d0306e961ef9",
        "_type": "block",
        "children": [
          {
            "_key": "1f67d6f3c64a",
            "_type": "span",
            "marks": [],
            "text": "prototyping faster"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "af18eeb8543b",
        "_type": "block",
        "children": [
          {
            "_key": "0223276d2f1e",
            "_type": "span",
            "marks": [],
            "text": "Now? Most of that became easy."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "fd0ce261c1c9",
        "_type": "block",
        "children": [
          {
            "_key": "875e5ea61b32",
            "_type": "span",
            "marks": [],
            "text": "The people who will stand out are the ones companies feel have a real way of thinking, not just a skillset.\nBecause AI can help you execute tasks. But it still can’t become "
          },
          {
            "_key": "c1e5c241b424",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "you"
          },
          {
            "_key": "3c4929936d61",
            "_type": "span",
            "marks": [],
            "text": "."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "669d9dae94d8",
        "_type": "block",
        "children": [
          {
            "_key": "df305fe09994",
            "_type": "span",
            "marks": [],
            "text": "It can’t replicate:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "366a9fc1d365",
        "_type": "block",
        "children": [
          {
            "_key": "3502b8cbafdd",
            "_type": "span",
            "marks": [],
            "text": "your perspective"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "96e7bad4e26c",
        "_type": "block",
        "children": [
          {
            "_key": "c2cd26ecb73f",
            "_type": "span",
            "marks": [],
            "text": "your curiosity"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b9acc4f2c85c",
        "_type": "block",
        "children": [
          {
            "_key": "71464c3836b9",
            "_type": "span",
            "marks": [],
            "text": "your judgment"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "c5983f4b7d45",
        "_type": "block",
        "children": [
          {
            "_key": "f225c089b5d2",
            "_type": "span",
            "marks": [],
            "text": "your reasoning"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5802bd0d0b59",
        "_type": "block",
        "children": [
          {
            "_key": "bbf31979e35a",
            "_type": "span",
            "marks": [],
            "text": "your lived experience"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1b16000dd8ce",
        "_type": "block",
        "children": [
          {
            "_key": "a404e00a9c7a",
            "_type": "span",
            "marks": [
              "highlight"
            ],
            "text": "And honestly, that’s probably why personal branding suddenly became so important."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "25cbfc3aa6af",
        "_type": "block",
        "children": [
          {
            "_key": "0fc0755931cf",
            "_type": "span",
            "marks": [],
            "text": "People want to see:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b754d7ee2e83",
        "_type": "block",
        "children": [
          {
            "_key": "0fc0755931cf",
            "_type": "span",
            "marks": [],
            "text": "How you think."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "da87b922f438",
        "_type": "block",
        "children": [
          {
            "_key": "0fc0755931cf",
            "_type": "span",
            "marks": [],
            "text": "How you solve problems."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "623af91c7965",
        "_type": "block",
        "children": [
          {
            "_key": "0fc0755931cf",
            "_type": "span",
            "marks": [],
            "text": "What you’re curious about."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "f63b56661ad9",
        "_type": "block",
        "children": [
          {
            "_key": "0fc0755931cf",
            "_type": "span",
            "marks": [],
            "text": "What experiments you’re trying."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "5f14447054d1",
        "_type": "block",
        "children": [
          {
            "_key": "f7a4b325610a",
            "_type": "span",
            "marks": [],
            "text": "Not just polished outputs."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "a1972f604939",
        "_type": "block",
        "children": [
          {
            "_key": "6851dd7431e4",
            "_type": "span",
            "marks": [],
            "text": "One piece of advice I keep seeing everywhere now is:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "ace4dde7d165",
        "_type": "block",
        "children": [
          {
            "_key": "58f6157988b6",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "\"Build in public.\""
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "9b3d2e2d62dd",
        "_type": "block",
        "children": [
          {
            "_key": "320deafad3b1",
            "_type": "span",
            "marks": [],
            "text": "Show people what you’re learning.\nWhat you’re testing.\nWhat you’re struggling with."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "218542d85b30",
        "_type": "block",
        "children": [
          {
            "_key": "2e081d99c42d",
            "_type": "span",
            "marks": [],
            "text": "Because maybe that’s one of the few things AI still can’t imitate convincingly:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "36121b23965e",
        "_type": "block",
        "children": [
          {
            "_key": "6213def424a9",
            "_type": "span",
            "marks": [],
            "text": "Your journey."
          }
        ],
        "markDefs": [],
        "style": "blockquote"
      },
      {
        "_key": "ed078f068acb",
        "_type": "block",
        "children": [
          {
            "_key": "28ca7febb3a8",
            "_type": "span",
            "marks": [],
            "text": "Final thoughts"
          }
        ],
        "markDefs": [],
        "style": "h3"
      },
      {
        "_key": "6b42337c9190",
        "_type": "block",
        "children": [
          {
            "_key": "4c9000c4ea4e",
            "_type": "span",
            "marks": [],
            "text": "I think a lot of people still misunderstand what’s actually happening.\nCompanies probably "
          },
          {
            "_key": "56ea7908f7cd",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "will"
          },
          {
            "_key": "532ba834dfeb",
            "_type": "span",
            "marks": [],
            "text": " need fewer designers in some areas."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "874d3b0ad4f5",
        "_type": "block",
        "children": [
          {
            "_key": "250d5025356e",
            "_type": "span",
            "marks": [],
            "text": "But more importantly: they’ll need a completely different kind of designer."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "2eef0ee22c1f",
        "_type": "block",
        "children": [
          {
            "_key": "f4a8c790ad31",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "Designers who can use AI without losing their ability to think."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "90e5f46e1be0",
        "_type": "block",
        "children": [
          {
            "_key": "1d40f4d13683",
            "_type": "span",
            "marks": [],
            "text": "Designers with taste."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "30b7fca6fca1",
        "_type": "block",
        "children": [
          {
            "_key": "1d40f4d13683",
            "_type": "span",
            "marks": [],
            "text": "With opinions."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b39015f0e598",
        "_type": "block",
        "children": [
          {
            "_key": "1d40f4d13683",
            "_type": "span",
            "marks": [],
            "text": "With judgment."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "1945c2e853f6",
        "_type": "block",
        "children": [
          {
            "_key": "1d40f4d13683",
            "_type": "span",
            "marks": [],
            "text": "People capable of saying:\n"
          },
          {
            "_key": "62eda9e7331c",
            "_type": "span",
            "marks": [
              "strong"
            ],
            "text": "\"No. This isn’t the right answer.\""
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "4676d4abc813",
        "_type": "block",
        "children": [
          {
            "_key": "105631d90eee",
            "_type": "span",
            "marks": [],
            "text": "Even when AI generates it in a second.\nAnd honestly? I don’t think the people who struggle most in the future will be the beginners.\nIt’ll be the people who stopped learning.\nBecause for the first time in a long time, the real value of a designer is no longer:\nwho can use tools faster, or who can produce more screens."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "b68bda6313e9",
        "_type": "block",
        "children": [
          {
            "_key": "f5396fafc895",
            "_type": "span",
            "marks": [],
            "text": "The real value is:"
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "37a2f3ddca6d",
        "_type": "block",
        "children": [
          {
            "_key": "f5396fafc895",
            "_type": "span",
            "marks": [],
            "text": "how you think,"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "0e420cc5ae2d",
        "_type": "block",
        "children": [
          {
            "_key": "f5396fafc895",
            "_type": "span",
            "marks": [],
            "text": "how deeply you understand humans,"
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "3f3bb05f6ac0",
        "_type": "block",
        "children": [
          {
            "_key": "f5396fafc895",
            "_type": "span",
            "marks": [],
            "text": "and whether you can give meaning to something the machine itself doesn’t truly understand."
          }
        ],
        "level": 1,
        "listItem": "bullet",
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "938777b51143",
        "_type": "block",
        "children": [
          {
            "_key": "467844a88e5d",
            "_type": "span",
            "marks": [],
            "text": "AI "
          },
          {
            "_key": "f70f54543a09",
            "_type": "span",
            "marks": [
              "em"
            ],
            "text": "will"
          },
          {
            "_key": "7dc26c5402fe",
            "_type": "span",
            "marks": [],
            "text": " change this industry."
          }
        ],
        "markDefs": [],
        "style": "normal"
      },
      {
        "_key": "e6a01f63dd65",
        "_type": "block",
        "children": [
          {
            "_key": "46b9069e485b",
            "_type": "span",
            "marks": [],
            "text": "It already is. But at least for now…\nit still needs someone capable of asking the right questions in the first place.\nAnd maybe that’s the most comforting and terrifying part at the same time.\nBecause the future probably doesn’t belong to the people resisting AI.\nAnd it doesn’t belong to the people depending on it completely either.\nIt belongs to the people who learned how to use it…\nwithout losing the way they think."
          }
        ],
        "markDefs": [],
        "style": "normal"
      }
    ],
    "category": "AI & Design ",
    "coverImage": {
      "_type": "image",
      "asset": {
        "_ref": "image-2151e4380bd1a3312f7f1d7abba0809aeb3e779f-1536x1024-png",
        "url": "/og-image.png"
      }
    },
    "excerpt": "Do you think artificial intelligence will replace us in 2026 ? And what is the future for designers?",
    "featured": true,
    "featuredOrder": 1,
    "isEssay": true,
    "publishedAt": "2026-05-16T23:05:00.000Z",
    "readingTime": 9,
    "seoDescription": "Explore whether AI will replace UI/UX designers, how the design industry is changing, and why human thinking still matters in the AI era.",
    "seoTitle": "Will AI Replace UX Designers in 2026 ? | The Future of Creativity & Human Work",
    "slug": {
      "_type": "slug",
      "current": "will-ai-replace-ux-designers-in-2026"
    },
    "status": "published",
    "tags": [
      "AI ",
      "Future ",
      "Design ",
      "Technology ",
      "Productivity"
    ],
    "title": "Will AI Replace UX Designers in 2026?"
  }
]

export const mockArticleSlugs: SanitySlug[] = mockAllArticles
  .filter((a) => Boolean(a.slug?.current))
  .map((a) => ({ slug: a.slug.current }))
