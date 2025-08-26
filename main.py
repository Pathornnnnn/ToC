import requests
import re
import pandas as pd
import time
from bs4 import BeautifulSoup

url1 = "https://oceanofgames.com/"
web = requests.get(url1).text
Max_page = 5

navbar = r'<li\sid="menu-item-[\d]*"\sclass="menu-[\w]*"><a\shref="([\w:/.-]*)">[\w\s]*<span\sclass="p"></span></a></li>'
links = re.findall(navbar, web)

all_posts = []

print('eiei', links)
print()
name_catagory = []
for link in links:
    name = re.findall(r'category/([\w-]*)', link)
    print(name)
    if name:
        name_catagory.append(name[0])
print(name_catagory)
ids_seen = set()
url_seen = set()


def scraping_all_category(max_page=5):
    print('Start Scraping...')
    st = time.time()
    for link in links:
        url2 = link
        name = re.findall(r'category/([\w-]*)', link)
        print('Category : ', name[0] if name else 'No category')
        while True:
            if url2 in url_seen:
                break
            url_seen.add(url2)
            div = requests.get(url2).text
            if not div:
                break

            titles = re.findall(r'<a\sclass="post-thumb\s"\sid="thumb-[\d]*"\shref="[\w:/.-]*"\stitle="([\w\s.]*)">', div)
            ids = re.findall(r'<a\sclass="post-thumb\s"\sid="thumb-([\d]*)"', div)
            imgs = re.findall(r'<img\swidth="140"\sheight="140"\ssrc="([\w:/.-]*)"', div)
            dates = re.findall(r'<div\sclass="post-std\sclear-block">[\w\W]*?<div\sclass="post-date"><span\sclass="ext">([\d\s\w]+)</span></div>', div)
            
            # block content ของ description (ใช้ regex ก่อน)
            desc_blocks = re.findall(r'<div\sclass="post-content\sclear-block">([\w\W]*?)<p\sclass="more">', div)

            tag_blocks = re.findall(r'<div class="post-info">([\w\W]*?)</div>', div)

            for i in range(len(titles)):
                if ids[i] in ids_seen:
                    continue
                ids_seen.add(ids[i])

                # --- ใช้ BeautifulSoup ดึง <p> description ---
                desc = None
                if i < len(desc_blocks):
                    soup = BeautifulSoup(desc_blocks[i], "html.parser")
                    p = soup.find("p")
                    if p:
                        desc = p.get_text(" ", strip=True)
                        if len(desc) > 150:
                            desc = desc[:150] + "..."

                tags = re.findall(r'\srel="tag"\stitle="([\w]+)', tag_blocks[i]) if i < len(tag_blocks) else []

                post = {
                    "ID": ids[i].strip() if i < len(ids) else None,
                    "Title": titles[i].strip() if i < len(titles) else None,
                    "Tags": tags,
                    "Image": imgs[i].strip() if i < len(imgs) else None,
                    "Date": dates[i].strip() if i < len(dates) else None,
                    "Description": desc,
                }
                all_posts.append(post)

            next_page = re.findall(r'<a\s+class="next"\s+href="([^"]+)">', div)
            if next_page:
                next_num = re.findall(r'page/(\d+)', url2)
                if not next_num:
                    next_num = [1]
                next_num = int(next_num[0])
                if not next_num <= max_page:
                    break
                url2 = next_page[0]
                print('Go to page : ', next_num)
            else:
                break

    elapsed = time.time() - st
    print(f"Scraping finished in {elapsed:.2f} seconds.")
    print(all_posts[0])
    return all_posts


# ตัวอย่างการรัน
# data = scraping_all_category(Max_page)
# df = pd.DataFrame(data)
# df.to_csv("data.csv", index=False, encoding="utf-8-sig")
