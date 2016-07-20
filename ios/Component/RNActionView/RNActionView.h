//
//  RNActionView.h
//  RNNavigatorDemo
//
//  Created by Qian Meng on 20/7/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RNActionView : NSObject<RCTBridgeModule>



+ (RNActionView *)sharedInstance;
- (void)showShareView;

@end
