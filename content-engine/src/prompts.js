import config from './config.js';

export const SYSTEM_PROMPT = `You are an expert SEO content writer specializing in real estate investing, specifically house flipping. 

Your writing style is:
- Practical and actionable (not theoretical fluff)
- Written for beginners but respected by experienced flippers
- Conversational but professional
- Data-driven when possible (use realistic numbers)
- Focused on helping readers avoid costly mistakes

Brand voice for ${config.site.name}:
- Position as the "first step" resource for aspiring flippers
- Emphasize practical tools over expensive courses
- Build trust through transparency about risks and rewards
- Never promise get-rich-quick results

SEO Guidelines:
- Use the target keyword naturally in the first 100 words
- Include keyword variations and LSI terms throughout
- Use proper heading hierarchy (H2, H3)
- Write scannable content with short paragraphs
- Include bullet points and numbered lists where appropriate
- Aim for comprehensive coverage that answers all related questions`;

export const generateArticlePrompt = (keyword, pillarInfo, relatedKeywords = []) => {
  const currentYear = new Date().getFullYear();
  
  return `Write a comprehensive, SEO-optimized blog article for the keyword: "${keyword}"

Target Word Count: ${config.content.minWordCount}-${config.content.maxWordCount} words

Content Pillar: ${pillarInfo.name}
Hub Page: ${pillarInfo.hubPage}

Related keywords to naturally include:
${relatedKeywords.map(k => `- ${k}`).join('\n')}

Article Structure Requirements:

1. TITLE (H1)
   - Include the main keyword
   - Make it compelling and click-worthy
   - Include current year (${currentYear}) if relevant

2. INTRODUCTION (150-200 words)
   - Hook the reader with a relatable problem or question
   - Include the main keyword in the first 100 words
   - Preview what they'll learn
   - Establish credibility

3. MAIN CONTENT (organized with H2 and H3 headings)
   - Cover the topic comprehensively
   - Use real-world examples with realistic numbers
   - Include actionable steps where appropriate
   - Address common questions and objections
   - Use bullet points and numbered lists for scannability

4. KEY TAKEAWAYS (bullet points)
   - 4-6 main points summarizing the article

${config.content.includeFaq ? `5. FAQ SECTION
   - 4-5 frequently asked questions related to the topic
   - Concise, helpful answers
   - Use question-based H3 headings` : ''}

${config.content.includeCta ? `6. CALL TO ACTION
   - Mention the "${config.site.productName}" as a helpful resource
   - Or offer the free "${config.site.freeResourceName}"
   - Keep it natural, not salesy` : ''}

Format the output as valid Markdown with proper heading hierarchy.

IMPORTANT: 
- Do NOT include any frontmatter or metadata
- Start directly with the H1 title
- Use only ## for H2 and ### for H3
- Do not use H1 (#) anywhere except the title`;
};

export const generateMetaPrompt = (keyword, articleContent) => {
  return `Based on this article about "${keyword}", generate SEO metadata.

Article excerpt (first 500 chars):
${articleContent.substring(0, 500)}...

Generate the following in JSON format:
{
  "title": "SEO title (50-60 characters, include keyword)",
  "description": "Meta description (150-160 characters, include keyword, compelling)",
  "excerpt": "Short excerpt for blog listing (100-150 characters)",
  "tags": ["array", "of", "relevant", "tags"],
  "readingTime": estimated_minutes_as_number
}

Return ONLY valid JSON, no other text.`;
};

export const generateOutlinePrompt = (keyword, pillarInfo) => {
  return `Create a detailed content outline for an article about "${keyword}".

Content Pillar: ${pillarInfo.name}

Generate an outline with:
1. Compelling title options (3 variations)
2. Main sections (H2 headings) - 4-6 sections
3. Subsections (H3 headings) under each main section
4. Key points to cover in each section
5. Suggested examples or data points to include
6. Internal linking opportunities to other pillar content

Format as structured JSON:
{
  "titleOptions": ["title1", "title2", "title3"],
  "sections": [
    {
      "heading": "H2 heading",
      "subsections": [
        {
          "heading": "H3 heading",
          "keyPoints": ["point1", "point2"],
          "examples": ["example1"]
        }
      ]
    }
  ],
  "internalLinks": [
    {"anchor": "text", "suggestedUrl": "/path"}
  ]
}

Return ONLY valid JSON.`;
};

export default {
  SYSTEM_PROMPT,
  generateArticlePrompt,
  generateMetaPrompt,
  generateOutlinePrompt,
};
