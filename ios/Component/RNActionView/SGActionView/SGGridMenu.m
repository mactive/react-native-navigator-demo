//
//  SGGridMenu.m
//  SGActionView
//
//  Created by Sagi on 13-9-6.
//  Copyright (c) 2013年 AzureLab. All rights reserved.
//

#import "SGGridMenu.h"
#import <QuartzCore/QuartzCore.h>

#define kMAX_CONTENT_SCROLLVIEW_HEIGHT  400
#define ITEMS_PER_LINE                  4

#define GREENCOLOR [UIColor colorWithRed:57.0f/255.0f green:180.0f/255.0f blue:115.0f/255.0f alpha:1]

#define GREENALPHACOLOR [UIColor colorWithRed:45.0f/255.0f green:173.0f/255.0f blue:105.0f/255.0f alpha:0.8]
#define GREENLIGHTCOLOR [UIColor colorWithRed:186.0f/255.0f green:230.0f/255.0f blue:211.0f/255.0f alpha:1]
#define GREENEXLIGHTCOLOR [UIColor colorWithRed:216.0f/255.0f green:240.0f/255.0f blue:231.0f/255.0f alpha:1]
#define GREENDARKCOLOR [UIColor colorWithRed:27.0f/255.0f green:171.0f/255.0f blue:109.0f/255.0f alpha:1]

#define REDCOLOR [UIColor colorWithRed:225.0f/255.0f green:78.0f/255.0f blue:0.0f/255.0f alpha:1]
#define GRAYCOLOR [UIColor colorWithRed:158.0f/255.0f green:158.0f/255.0f blue:158.0f/255.0f alpha:1]
#define GRAYLIGHTCOLOR [UIColor colorWithRed:190.0f/255.0f green:190.0f/255.0f blue:190.0f/255.0f alpha:1]
#define GRAYEXLIGHTCOLOR [UIColor colorWithRed:240.0f/255.0f green:240.0f/255.0f blue:240.0f/255.0f alpha:1]


@interface SGGridItem : UIButton
@property (nonatomic, weak) SGGridMenu *menu;
@property (nonatomic, strong)UIImage *theImage;
@property (nonatomic, strong)UIImageView *theImageView;
@end

@implementation SGGridItem

- (id)initWithTitle:(NSString *)title image:(UIImage *)image
{
    self = [super initWithFrame:CGRectZero];
    if (self) {
        self.clipsToBounds = NO;
        
        self.titleLabel.font = [UIFont systemFontOfSize:12];
        self.titleLabel.backgroundColor = [UIColor clearColor];
        self.titleLabel.textAlignment = NSTextAlignmentCenter;
        [self setTitle:title forState:UIControlStateNormal];
        [self setTitleColor:BaseMenuTextColor(self.menu.style) forState:UIControlStateNormal];
//        [self setImage:image forState:UIControlStateNormal];
        self.theImageView = [[UIImageView alloc] initWithImage:image];
//        self.theImageView.contentMode = UIViewContentModeScaleAspectFit;
        [self addSubview:self.theImageView];
        self.theImage = image;
        if (self.theImage == nil) {
            [self.titleLabel.layer setBorderColor:GRAYEXLIGHTCOLOR.CGColor];
            [self.titleLabel.layer setBorderWidth:0.5f];
        }
    }
    return self;
}

- (void)setHighlighted:(BOOL)highlighted
{
    if (highlighted) {
        [self setTitleColor:GREENCOLOR forState:UIControlStateNormal];
        [self setBackgroundColor:GRAYLIGHTCOLOR];
        [self.titleLabel.layer setBorderColor:GREENLIGHTCOLOR.CGColor];
    }else{
        [self setBackgroundColor:[UIColor whiteColor]];
        [self setTitleColor:BaseMenuTextColor(self.menu.style) forState:UIControlStateNormal];
        [self.titleLabel.layer setBorderColor:GRAYEXLIGHTCOLOR.CGColor];
    }
}

- (void)layoutSubviews
{
    [super layoutSubviews];

    float width = self.bounds.size.width;
    float height = self.bounds.size.height;

    if (self.theImage != nil) {
        CGRect imageRect = CGRectMake(width * 0.03, 0, width * 0.93, width * 0.93);
        self.theImageView.frame = imageRect;
        
        float labelHeight = height - (imageRect.origin.y + imageRect.size.height);
        CGRect labelRect = CGRectMake(width * 0.05, imageRect.origin.y + imageRect.size.height*1.03, width * 0.9, labelHeight);
        self.titleLabel.frame = labelRect;
    }else{
        CGRect labelRect = CGRectMake(0, 0, width , height);
        self.titleLabel.frame = labelRect;
        self.titleLabel.numberOfLines = 0;
    }
}

@end


@interface SGGridMenu ()
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UIScrollView *contentScrollView;
@property (nonatomic, strong) SGButton *cancelButton;
@property (nonatomic, strong) NSArray *itemTitles;
@property (nonatomic, strong) NSArray *itemImages;
@property (nonatomic, strong) NSArray *items;
@property (nonatomic, strong) void (^actionHandle)(NSInteger);
@end

@implementation SGGridMenu

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = BaseMenuBackgroundColor(self.style);

        _itemTitles = [NSArray array];
        _itemImages = [NSArray array];
        _items = [NSArray array];
        
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectZero];
        _titleLabel.backgroundColor = [UIColor clearColor];
        _titleLabel.font = [UIFont boldSystemFontOfSize:17];
        _titleLabel.textAlignment = NSTextAlignmentCenter;
        _titleLabel.textColor = BaseMenuTextColor(self.style);
        [self addSubview:_titleLabel];
        
        _contentScrollView = [[UIScrollView alloc]initWithFrame:CGRectZero];
        _contentScrollView.contentSize = _contentScrollView.bounds.size;
        _contentScrollView.showsHorizontalScrollIndicator = NO;
        _contentScrollView.showsVerticalScrollIndicator = YES;
        _contentScrollView.backgroundColor = [UIColor clearColor];
        [self addSubview:_contentScrollView];
        
        _cancelButton = [SGButton buttonWithType:UIButtonTypeCustom];
        _cancelButton.clipsToBounds = YES;
        _cancelButton.titleLabel.font = [UIFont systemFontOfSize:17];
//        [_cancelButton setTitleColor:BaseMenuTextColor(self.style) forState:UIControlStateNormal];
        [_cancelButton addTarget:self
                          action:@selector(tapAction:)
                forControlEvents:UIControlEventTouchUpInside];
        [_cancelButton setTitle:@"取    消" forState:UIControlStateNormal];
        [self addSubview:_cancelButton];
    }
    return self;
}

- (id)initWithTitle:(NSString *)title itemTitles:(NSArray *)itemTitles images:(NSArray *)images
{
    self = [self initWithFrame:[[UIScreen mainScreen] bounds]];
    if (self) {
        NSInteger count = MIN(itemTitles.count, images.count);
        if (images.count == 0 && itemTitles.count) {
            count = MAX(itemTitles.count, images.count);
        }
        _titleLabel.text = title;
        _itemTitles = [itemTitles subarrayWithRange:NSMakeRange(0, count)];
        _itemImages = [images subarrayWithRange:NSMakeRange(0, count)];
        [self setupWithItemTitles:_itemTitles images:_itemImages];
    }
    return self;
}

- (void)setupWithItemTitles:(NSArray *)titles images:(NSArray *)images
{
    NSMutableArray *items = [NSMutableArray array];
    for (int i=0; i<titles.count; i++) {
        SGGridItem *item = [[SGGridItem alloc] initWithTitle:titles[i] image:images[i]];
        item.menu = self;
        item.tag = i;
        [item addTarget:self
                 action:@selector(tapAction:)
       forControlEvents:UIControlEventTouchUpInside];
        [items addObject:item];
        [_contentScrollView addSubview:item];
    }
    _items = [NSArray arrayWithArray:items];
}

- (void)setStyle:(SGActionViewStyle)style{
    _style = style;
    
    self.backgroundColor = BaseMenuBackgroundColor(style);
    self.titleLabel.textColor = BaseMenuTextColor(style);
    [self.cancelButton setTitleColor:BaseMenuActionTextColor(style) forState:UIControlStateNormal];
    for (SGGridItem *item in self.items) {
        [item setTitleColor:BaseMenuTextColor(style) forState:UIControlStateNormal];
    }
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    self.titleLabel.frame = (CGRect){CGPointZero, CGSizeMake(self.bounds.size.width, 40)};
    
    [self layoutContentScrollView];
    self.contentScrollView.frame = (CGRect){CGPointMake(0, self.titleLabel.frame.size.height), self.contentScrollView.bounds.size};
    
    self.cancelButton.frame = CGRectMake(self.bounds.size.width*0.05, self.titleLabel.bounds.size.height + self.contentScrollView.bounds.size.height, self.bounds.size.width*0.9, 44);
    
    self.bounds = (CGRect){CGPointZero, CGSizeMake(self.bounds.size.width, self.titleLabel.bounds.size.height + self.contentScrollView.bounds.size.height + self.cancelButton.bounds.size.height+10)};
}

- (void)layoutContentScrollView
{
    UIEdgeInsets margin = UIEdgeInsetsMake(10, 10, 25, 10);
    CGFloat sepWidth = 20.0f;

    CGFloat itemWidth = (self.bounds.size.width - margin.left - margin.right - sepWidth*(ITEMS_PER_LINE-1)) / ITEMS_PER_LINE;

    CGFloat itemHeight = 0.0f;
    if ([self.itemImages count] == 0) {
        itemHeight = 60.0f;
    }else{
        itemHeight = itemWidth;
    }
    
    CGSize itemSize = CGSizeMake(itemWidth, itemHeight);
    
    NSInteger itemCount = self.items.count;
    NSInteger rowCount = ((itemCount-1) / ITEMS_PER_LINE) + 1;
    self.contentScrollView.contentSize = CGSizeMake(self.bounds.size.width, rowCount * itemSize.height + margin.top + margin.bottom);
    for (int i=0; i<itemCount; i++) {
        SGGridItem *item = self.items[i];
        int row = i / ITEMS_PER_LINE;
        int column = i % ITEMS_PER_LINE;
        CGPoint p = CGPointMake(margin.left + column * (itemSize.width+sepWidth), margin.top + row * itemSize.height);
        item.frame = (CGRect){p, itemSize};
        [item layoutIfNeeded];
    }
    
    if (self.contentScrollView.contentSize.height > kMAX_CONTENT_SCROLLVIEW_HEIGHT) {
        self.contentScrollView.bounds = (CGRect){CGPointZero, CGSizeMake(self.bounds.size.width, kMAX_CONTENT_SCROLLVIEW_HEIGHT)};
    }else{
        self.contentScrollView.bounds = (CGRect){CGPointZero, self.contentScrollView.contentSize};
    }
}

#pragma mark - 

- (void)triggerSelectedAction:(void (^)(NSInteger))actionHandle
{
    self.actionHandle = actionHandle;
}

#pragma mark -

- (void)tapAction:(SGButton *)sender
{
    if (self.actionHandle) {
        if ([sender isEqual:self.cancelButton]) {
            double delayInSeconds = 0.15;
            dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
            dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
                self.actionHandle(-1);
            });
        }else{
            double delayInSeconds = 0.15;
            dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
            dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
                self.actionHandle(sender.tag);
            });
        }
    }
}

@end
