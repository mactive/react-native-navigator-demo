//
//  RNActionView.m
//  RNNavigatorDemo
//
//  Created by Qian Meng on 20/7/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RNActionView.h"
#import "SGActionView.h"


#define T(a)    NSLocalizedString((a), nil)

@interface RNActionView()

@property (nonatomic, strong) RCTResponseSenderBlock callback;


@end

@implementation RNActionView

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(showActionView:(RCTResponseSenderBlock)callback)
{
  self.callback = callback;
  [self showShareView];
}


- (void)showShareView
{
  __weak typeof(self) weakSelf = self;
  // 资源bundle 化, 然后bundle 需要加载到主项目中
  dispatch_async(dispatch_get_main_queue(), ^{
    
    NSArray *titles = @[T(@"微信好友"),T(@"朋友圈"),T(@"QQ好友"),T(@"QQ空间")];
    [[SGActionView sharedActionView] setStyle:SGActionViewStyleLight];
    [SGActionView showGridMenuWithTitle:T(@"分享")
                             itemTitles:titles
                                 images:nil
                         selectedHandle:^(NSInteger index) {
                           [weakSelf shareActionClickWithIndex:index];
                           weakSelf.callback(@[@{@"isShown": @YES, @"title":titles[index]}]);
                         }];
    
    
  });
  
}

-(void)shareActionClickWithIndex:(NSUInteger)index
{
  NSLog(@"%lu",(unsigned long)index);
}


+ (RNActionView *)sharedInstance {
  static RNActionView *_sharedClient = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _sharedClient = [[RNActionView alloc] init];
    
  });
  
  return _sharedClient;
}

@end
