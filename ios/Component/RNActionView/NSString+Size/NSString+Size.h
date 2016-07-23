//
//  NSString+Size.h
//  bitmedia
//
//  Created by meng qian on 14-3-4.
//  Copyright (c) 2014年 thinktube. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface NSString (Size)

- (CGSize) sizeWithWidth:(float)width andFont:(UIFont *)font;
- (CGSize) sizeWithWidth:(float)width andFont:(UIFont *)font andLineSpaceing:(CGFloat)height;

- (CGSize) sizeWithHeight:(float)height andFont:(UIFont *)font;


@end
