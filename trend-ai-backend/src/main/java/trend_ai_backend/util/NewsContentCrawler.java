package trend_ai_backend.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class NewsContentCrawler {
    public static String extractContent(String url) {
        try {
            Document doc = Jsoup.connect(url).get();
            String result = doc.select("article").text(); // 네이버 뉴스 본문 크롤링

            return (result == null || result.isBlank()) ? null : result;
        } catch (Exception e) {
            e.printStackTrace();
            return null; // 실패하면 null 리턴
        }
    }
}
