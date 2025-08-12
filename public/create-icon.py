#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon():
    # 512x512 이미지 생성
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 배경 원
    center = size // 2
    radius = 240
    draw.ellipse([center-radius, center-radius, center+radius, center+radius], 
                fill=(255, 107, 107, 255), outline=(231, 76, 60, 255), width=8)
    
    # 내부 원
    inner_radius = 200
    draw.ellipse([center-inner_radius, center-inner_radius, center+inner_radius, center+inner_radius], 
                fill=(255, 255, 255, 255), outline=(200, 200, 200, 255), width=4)
    
    # 접시
    plate_y = 380
    draw.ellipse([center-180, plate_y-15, center+180, plate_y+15], fill=(240, 240, 240, 255))
    
    # 밥그릇
    bowl_x, bowl_y = center-60, center+20
    draw.ellipse([bowl_x-40, bowl_y-45, bowl_x+40, bowl_y+45], fill=(245, 222, 179, 255))
    draw.ellipse([bowl_x-40, bowl_y-50, bowl_x+40, bowl_y-30], fill=(255, 255, 255, 255))
    
    # 반찬들
    draw.ellipse([center+20-25, center-25, center+20+25, center+25], fill=(255, 99, 71, 255))
    draw.ellipse([center+60-20, center+20-20, center+60+20, center+20+20], fill=(50, 205, 50, 255))
    draw.ellipse([center+40-15, center+50-15, center+40+15, center+50+15], fill=(255, 215, 0, 255))
    
    # 하트
    heart_x, heart_y = center, center-80
    # 간단한 하트 모양 (원 두개로)
    draw.ellipse([heart_x-25, heart_y-10, heart_x-5, heart_y+10], fill=(255, 105, 180, 255))
    draw.ellipse([heart_x+5, heart_y-10, heart_x+25, heart_y+10], fill=(255, 105, 180, 255))
    draw.polygon([(heart_x-20, heart_y+5), (heart_x, heart_y+25), (heart_x+20, heart_y+5)], fill=(255, 105, 180, 255))
    
    # 저장
    img.save('luncher-icon.png', 'PNG')
    print("🍽️ PNG 아이콘이 생성되었습니다!")

if __name__ == "__main__":
    try:
        create_icon()
    except ImportError:
        print("PIL이 설치되지 않았습니다. 대신 간단한 텍스트 아이콘을 생성합니다.")
        # 간단한 방법으로 대체
        with open('luncher-icon.txt', 'w') as f:
            f.write('🍽️')