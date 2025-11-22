import { ImageResponse } from "next/og";
import { blogPosts } from "../blog-data";

export const runtime = "edge";

export const alt = "Blog Post Image";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);
    const title = post?.title || "Engineering Blog";
    const tags = post?.tags || ["Engineering", "SRE", "AI Ops"];

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundImage: "linear-gradient(to bottom right, #0f172a, #1e293b)",
                    padding: "80px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "linear-gradient(to right, #22d3ee, #818cf8)",
                            marginRight: "20px",
                        }}
                    />
                    <div
                        style={{
                            fontSize: 30,
                            fontWeight: 600,
                            color: "#94a3b8",
                        }}
                    >
                        Shubham Singh
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: "40px",
                        background: "linear-gradient(to right, #fff, #cbd5e1)",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                    }}
                >
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            style={{
                                fontSize: 24,
                                color: "#c084fc",
                                background: "rgba(192, 132, 252, 0.1)",
                                padding: "10px 20px",
                                borderRadius: "20px",
                                border: "1px solid rgba(192, 132, 252, 0.2)",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
