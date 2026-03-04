import { Composition } from "remotion";
import { ByteSummary } from "./ByteSummary";
import { ConceptExplainer } from "./ConceptExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ByteSummary"
        component={ByteSummary}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "How AI Screens Your Resume in 6 Seconds",
          category: "HR Tech",
          description: "Modern ATS systems use NLP and pattern matching to rank candidates before any human sees the resume.",
          keyPoints: [
            "ATS parses resume into structured data fields",
            "NLP extracts skills, experience, and education",
            "Keyword matching scores against job description",
            "Top 10% get forwarded to human recruiters",
            "Formatting matters — simple layouts parse better",
          ],
          accent: "#8b5cf6",
          byteNumber: 1,
          totalBytes: 143,
          statNumber: "75",
          statLabel: "percent of resumes rejected by ATS",
        }}
      />
      <Composition
        id="ConceptExplainer"
        component={ConceptExplainer}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          concept: "OAuth 2.0",
          tagline: "The authorization framework behind 'Sign in with Google'",
          analogy: "It's like a hotel key card — grants access to specific rooms without giving you the master key. Temporary, limited, revocable.",
          analogyIcon: "🏨",
          steps: [
            { icon: "👤", title: "User clicks 'Sign in'", detail: "App redirects to Google's auth endpoint" },
            { icon: "✅", title: "User grants consent", detail: "Google shows permission screen, user clicks Allow" },
            { icon: "🔑", title: "Auth code returned", detail: "Short-lived code sent back to your app" },
            { icon: "🎫", title: "Exchange for tokens", detail: "Server-to-server swap: code → access + refresh tokens" },
            { icon: "📦", title: "Access the API", detail: "Bearer token in header → get protected data" },
          ],
          components: [
            { icon: "👤", name: "Resource Owner", desc: "The user who owns the data" },
            { icon: "📱", name: "Client App", desc: "The app requesting access" },
            { icon: "🏛️", name: "Auth Server", desc: "Issues tokens (Google, Okta)" },
            { icon: "📦", name: "Resource Server", desc: "Holds the protected API" },
          ],
          codeExample: "POST /oauth/token\n{\n  grant_type: \"authorization_code\",\n  code: \"abc123\",\n  client_id: \"my-app\",\n  redirect_uri: \"https://app.com/cb\"\n}",
          takeaway: "OAuth authorizes apps, not users. It's a valet key — limited access, time-bound, revocable. For login, use OIDC on top.",
          accent: "#ef4444",
        }}
      />
    </>
  );
};
