---
id: xamarin-understand
slug: /xamarin-understand
title: Xamarin Tags Learn
date: 2024-11-04
authors: Hoo
tags: [xamarin]
keywords: [xamarin]
---

## Learning

### **Configure Navigation**

In the `xmlns` configuration of `view`, the default `Nav` will disappear

```xml
NavigationPage.HasNavigationBar="False"
```



### TabView

If it is the Home Page, there is a tabview design below

```
// 配置
xmlns:tabView="clr-namespace:Syncfusion.XForms.TabView;assembly=Syncfusion.SfTabView.XForms"
```

```xml
<ContentPage.Content>
    <tabView:SfTabView BackgroundColor="#f2f2f2" EnableSwiping="False"
                       TabHeaderPosition="Bottom" DisplayMode="Image"
                       VisibleHeaderCount="4">

        <tabView:SfTabView.SelectionIndicatorSettings>
            <tabView:SelectionIndicatorSettings Color="Transparent" Position="Fill"
                                                StrokeThickness="0" AnimationDuration="10"/>
        </tabView:SfTabView.SelectionIndicatorSettings>

        <!-- 第 1 -->
        <tabView:SfTabItem Title="Home" ImageSource="homeIcon" SelectionColor="#000000" TitleFontColor="#666666">
            <tabView:SfTabItem.Content>
                <ScrollView BackgroundColor="#ECECEC">
                    <StackLayout Padding="0,20,0,0"
                                 HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand" 
                                 BindingContext="{StaticResource UserVM}">
                    </StackLayout>
                </ScrollView>
            </tabView:SfTabItem.Content>
        </tabView:SfTabItem>

        <!-- 第 2 -->
        <tabView:SfTabItem Title="Movie" ImageSource="movieIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
            <tabView:SfTabItem.Content>
                <StackLayout BackgroundColor="#ECECEC" HorizontalOptions="FillAndExpand">
                    <!-- 内容可以在此处添加 -->
                </StackLayout>
            </tabView:SfTabItem.Content>
        </tabView:SfTabItem>

        <!-- 第 3 -->
        <tabView:SfTabItem Title="Actor" ImageSource="userIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
            <tabView:SfTabItem.Content>
                <StackLayout BackgroundColor="#ECECEC" BindingContext="{StaticResource UserVM}">
                    <!-- 内容可以在此处添加 -->
                </StackLayout>
            </tabView:SfTabItem.Content>
        </tabView:SfTabItem>

        <!-- 第 4 -->
        <tabView:SfTabItem Title="User" ImageSource="userIcon" SelectionColor="#000000" TitleFontColor="#a3a0a0">
            <tabView:SfTabItem.Content>
                <StackLayout BackgroundColor="#ECECEC" BindingContext="{StaticResource UserVM}">
                    <!-- 内容可以在此处添加 -->
                </StackLayout>
            </tabView:SfTabItem.Content>
        </tabView:SfTabItem>

    </tabView:SfTabView>
</ContentPage.Content>
```



### Frame

**Border**: `Frame` can define the color and thickness of the border to help visually distinguish the content.

**Shadow**: You can add a shadow effect to make the `Frame` appear to float above other content and enhance the three-dimensional effect.

**Rounded Corners**: You can set the corners to be rounded to make the interface softer.

```xml
<Frame Padding="10"
       BackgroundColor="White"
       BorderColor="Gray"
       CornerRadius="5"
       HasShadow="True">
    <StackLayout>
        <Label Text="Hello, World!"
               FontSize="20"
               HorizontalOptions="Center" />
        <Button Text="Click Me"
                HorizontalOptions="Center" />
    </StackLayout>
</Frame>
```

```xml
<Frame CornerRadius="100" HasShadow="True" HeightRequest="32" WidthRequest="32"
       BackgroundColor="Black" Padding="5" Margin="12,11,0,0">
    <Image Source="tuneIcon" HeightRequest="10" WidthRequest="10"/>
    <Frame.GestureRecognizers>
        <TapGestureRecognizer Tapped="OpenTenu"/>
    </Frame.GestureRecognizers>
</Frame>
```

```c#
private void OpenTenu(object sender, EventArgs e)
{
    // Logic for handling click events, such as opening a menu
}
```



### CollectionView

Display a vertical list

**Orientation="Vertical"**:

- This property sets the orientation of the items to vertical. That is, all items will be arranged from top to bottom.

**Span="4"**:

- This property specifies the number of items to be displayed per row. In this example, 4 items will be displayed per row. When the total number of items exceeds 4, they will automatically wrap to the next row.

**HorizontalItemSpacing="10"**:

- This property defines the horizontal spacing between items. In this example, the horizontal spacing between items is set to 10 units (usually pixels or device independent units). This means that there will be a 10-unit gap between each item.

**VerticalItemSpacing="10"**:

- This property defines the vertical spacing between items. Similar to `HorizontalItemSpacing`, this property sets the vertical spacing between items to 10 units. This makes the items in each row also have a 10-unit gap.

`MVVM version`

```xml
<CollectionView ItemsSource="{Binding ActorAvatar}" Margin="10,0,10,0">
    <CollectionView.ItemsLayout>
        <!-- 4 per row -->
        <GridItemsLayout Orientation="Vertical"
                         Span="4"
                         HorizontalItemSpacing="10"
                         VerticalItemSpacing="10"/>
    </CollectionView.ItemsLayout>

    <CollectionView.ItemTemplate>
        <DataTemplate>
            <StackLayout>
                <StackLayout Padding="0,10,0,10">
                    <Frame AbsoluteLayout.LayoutFlags="All"
                           AbsoluteLayout.LayoutBounds="0,0,1,1"
                           Padding="0" CornerRadius="100"
                           HeightRequest="80" WidthRequest="80"
                           HorizontalOptions="StartAndExpand">
                        <AbsoluteLayout>
                            <Image Source="{Binding ActorImage}"
                                   Aspect="AspectFill"
                                   AbsoluteLayout.LayoutFlags="All"
                                   AbsoluteLayout.LayoutBounds="0,0,1,1"/>
                        </AbsoluteLayout>
                    </Frame>

                    <Label Text="{Binding ActorName}"
                           HorizontalTextAlignment="Center"
                           FontAttributes="Bold"/>
                </StackLayout>

                <StackLayout.GestureRecognizers>
                    <TapGestureRecognizer CommandParameter="{Binding ActorID}"
                                          Tapped="MoveActorMovie"/>
                </StackLayout.GestureRecognizers>
            </StackLayout>
        </DataTemplate>
    </CollectionView.ItemTemplate>
</CollectionView>
```

`Normal version`

```xml
<CollectionView ItemsLayout="HorizontalList"
                x:Name="PromotionList"
                HeightRequest="250"
                HorizontalScrollBarVisibility="Never"
                VerticalOptions="Start">

    <CollectionView.ItemTemplate>
        <DataTemplate>
            <StackLayout Padding="10">
                <Frame HasShadow="True"
                       BackgroundColor="{Binding Genre}"
                       Padding="25,10"
                       CornerRadius="100"
                       BorderColor="LightGray">
                    <Label Text="{Binding Title}" FontAttributes="Bold"
                           TextColor="{Binding Duration}"/>
                </Frame>

                <StackLayout.GestureRecognizers>
                    <TapGestureRecognizer CommandParameter="{Binding Title}" Tapped="Follow"/>
                </StackLayout.GestureRecognizers>
            </StackLayout>
        </DataTemplate>
    </CollectionView.ItemTemplate>

</CollectionView>
```



### grid

```xml
<Grid Padding="0,0,10,0">
    <Grid.RowDefinitions>
        <RowDefinition Height="*"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>

    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="3*"/>
        <ColumnDefinition Width="0.6*"/>
    </Grid.ColumnDefinitions>
</Grid>
```

```xml
Grid.Row="1" Grid.Column="1" Grid.RowSpan="2"
```



### StackLayout

```xml
<StackLayout Orientation="Horizontal" Padding="20,0,10,0" Margin="0,10,0,0">
```



### Image

```xml
<Image Source="{Binding HotMovie[1].MoviePoster}" Aspect="AspectFill"
       AbsoluteLayout.LayoutFlags="All"
       AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
```



### AbsoluteLayout

```xml
<AbsoluteLayout>
      <Image Source="{Binding HotMovie[0].MoviePoster}" Aspect="AspectFill"
             AbsoluteLayout.LayoutFlags="All"
             AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
			// Other Content
</AbsoluteLayout>
```



### Label

```xml
 <Label Text="{Binding Title}" TextColor="black" 
        FontSize="17" FontAttributes="Bold" VerticalTextAlignment="Center"/>
```



### BoxView

```xml
<BoxView BackgroundColor="LightGray" HeightRequest="1" HorizontalOptions="FillAndExpand"/>
```

```xml
<BoxView BackgroundColor="Black"
         AbsoluteLayout.LayoutFlags="All"
         AbsoluteLayout.LayoutBounds="0,0,1,1"
         Opacity="0.5"
         x:Name="Boxblack"
         IsVisible="false"
></BoxView>
```



### ScrollView

```xml
 <ScrollView BackgroundColor="#ECECEC">
     <StackLayout Padding="0,20,0,0"
                  HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand" 
                  BindingContext="{StaticResource UserVM}">
				// Other Content
      </StackLayout>
</ScrollView>
```



### abstractions:CircleImage

```xml
<abstractions:CircleImage Aspect="AspectFill"
                          WidthRequest="80"
                          HeightRequest="80"
                          HorizontalOptions="CenterAndExpand"
                          Source="{Binding UserAvatar}"/>
```



### Entry

```xml
<Entry TextColor="Black" Text="{Binding Email}"/>
```



## PopUpPage

### Project Example

#### **1, Front End**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<pages:PopupPage xmlns:pages="http://rotorgames.com"
                 xmlns="http://xamarin.com/schemas/2014/forms"
                 xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
                 xmlns:pancakeview="clr-namespace:Xamarin.Forms.PancakeView;assembly=Xamarin.Forms.PancakeView"
                 xmlns:inputLayout="clr-namespace:Syncfusion.XForms.TextInputLayout;assembly=Syncfusion.Core.XForms"
                 xmlns:button="clr-namespace:Syncfusion.XForms.Buttons;assembly=Syncfusion.Buttons.XForms"
                 x:Class="Cinema.PopupPage.SignupPopup"
                 xmlns:vm="clr-namespace:Cinema.ViewModel">

    <pages:PopupPage.Animation>
        <pages:MoveAnimation DurationIn="500"
                             DurationOut="500"
                             EasingIn="SpringIn"
                             EasingOut="SpringOut"
                             HasBackgroundAnimation="True"
                             PositionIn="Bottom"
                             PositionOut="Bottom"/>
    </pages:PopupPage.Animation>

    <ScrollView>
        <AbsoluteLayout x:Name="ds">

            <StackLayout AbsoluteLayout.LayoutFlags="All"
                         AbsoluteLayout.LayoutBounds="0,1,1,0.83">

                <pancakeview:PancakeView BackgroundColor="white"
                                         CornerRadius="10,10,0,0"
                                         VerticalOptions="FillAndExpand"
                                         WidthRequest="300"
                                         Padding="20"
                                         HorizontalOptions="FillAndExpand">

                    <StackLayout>

                        <Label Text="SIGN UP"
                               FontAttributes="Bold"
                               HorizontalOptions="CenterAndExpand"
                               FontSize="20"
                               Margin="0,0,0,10"/>

                        <inputLayout:SfTextInputLayout Hint="Full Name"
                                                       ContainerType="Outlined"
                                                       LeadingViewPosition="Inside"
                                                       OutlineCornerRadius="10">
                            <Entry TextColor="Black" Text="{Binding FullName}"/>
                            <inputLayout:SfTextInputLayout.LeadingView>
                                <Image Source="iconsuser" HeightRequest="23" WidthRequest="37"/>
                            </inputLayout:SfTextInputLayout.LeadingView>
                        </inputLayout:SfTextInputLayout>

                        <inputLayout:SfTextInputLayout Hint="User ID"
                                                       ContainerType="Outlined"
                                                       LeadingViewPosition="Inside"
                                                       OutlineCornerRadius="10">
                            <Entry TextColor="Black" Text="{Binding UserName}"/>
                            <inputLayout:SfTextInputLayout.LeadingView>
                                <Image Source="iconsuser" HeightRequest="23" WidthRequest="37"/>
                            </inputLayout:SfTextInputLayout.LeadingView>
                        </inputLayout:SfTextInputLayout>

                        <inputLayout:SfTextInputLayout Hint="Password"
                                                       ContainerType="Outlined"
                                                       LeadingViewPosition="Inside"
                                                       OutlineCornerRadius="10"
                                                       EnablePasswordVisibilityToggle="true"
                                                       Margin="0"
                                                       Padding="0">
                            <Entry TextColor="Black" Margin="0" Text="{Binding Password}"/>
                            <inputLayout:SfTextInputLayout.LeadingView>
                                <Image Source="iconspassword" HeightRequest="35" WidthRequest="35"/>
                            </inputLayout:SfTextInputLayout.LeadingView>
                        </inputLayout:SfTextInputLayout>

                        <inputLayout:SfTextInputLayout Hint="Phone Number"
                                                       ContainerType="Outlined"
                                                       LeadingViewPosition="Inside"
                                                       OutlineCornerRadius="10">
                            <Entry TextColor="Black" Text="{Binding Phone}"/>
                            <inputLayout:SfTextInputLayout.LeadingView>
                                <Image Source="phoneIcon" HeightRequest="23" WidthRequest="37"/>
                            </inputLayout:SfTextInputLayout.LeadingView>
                        </inputLayout:SfTextInputLayout>

                        <inputLayout:SfTextInputLayout Hint="Email"
                                                       ContainerType="Outlined"
                                                       LeadingViewPosition="Inside"
                                                       OutlineCornerRadius="10">
                            <Entry TextColor="Black" Text="{Binding Email}"/>
                            <inputLayout:SfTextInputLayout.LeadingView>
                                <Image Source="emailIcon" HeightRequest="23" WidthRequest="37"/>
                            </inputLayout:SfTextInputLayout.LeadingView>
                        </inputLayout:SfTextInputLayout>

                        <button:SfButton Text="Sign Up"
                                         CornerRadius="10"
                                         HeightRequest="50"
                                         BackgroundColor="#E14545"
                                         FontAttributes="Bold"
                                         Margin="0,15,0,0"
                                         Clicked="SfButton_Clicked"/>
                        
                        <button:SfButton Text="Cancel"
                                         CornerRadius="10"
                                         HeightRequest="50"
                                         BackgroundColor="LightGray"
                                         FontAttributes="Bold"
                                         Margin="0,5,0,0"
                                         TextColor="Black"
                                         Clicked="Button_Clicked"/>
                    </StackLayout>

                </pancakeview:PancakeView>

            </StackLayout>

            <BoxView BackgroundColor="Black"
                     AbsoluteLayout.LayoutFlags="All"
                     AbsoluteLayout.LayoutBounds="0,0,1,1"
                     Opacity="0.5"
                     x:Name="Boxblack"
                     IsVisible="false"/>

            <Image Source="Loading"
                   AbsoluteLayout.LayoutFlags="PositionProportional"
                   AbsoluteLayout.LayoutBounds="0.5,0.5,50,50"
                   Aspect="Fill"
                   IsAnimationPlaying="True"
                   x:Name="loadingpic"
                   IsVisible="false"/>

        </AbsoluteLayout>
    </ScrollView>
</pages:PopupPage>
```

#### **2, Back End**

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cinema.View;
using Cinema.ViewModel;
using Rg.Plugins.Popup.Services;
using Syncfusion.XForms.Buttons;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Cinema.PopupPage
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class SignupPopup
	{
        // Introduction
		public static SignUpVM vm = new SignUpVM();
        
        // Empower the front end
		public SignupPopup()
		{
			InitializeComponent();
			BindingContext = vm;
		}

		private async void Button_Clicked(object sender, EventArgs e)
		{
			await ((SfButton)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((SfButton)sender).ScaleTo(1, 10, Easing.Linear);

			PopupNavigation.PopAsync();
		}

		public static void PopupClose()
		{
			PopupNavigation.PopAsync();
		}

		private async void SfButton_Clicked(object sender, EventArgs e)
		{
			await ((SfButton)sender).ScaleTo(0.9, 10, Easing.Linear);
			await Task.Delay(10);
			await ((SfButton)sender).ScaleTo(1, 10, Easing.Linear);

			if (vm.UserName != null && vm.Password != null && vm.Email != null && vm.FullName != null && vm.Phone != null)
			{
				loadingpic.IsVisible = true;
				Boxblack.IsVisible = true;
				await Task.Delay(TimeSpan.FromSeconds(8));

				vm.CheckSignUp_New(vm.UserName, vm.Password, vm.Email, vm.FullName, vm.Phone);

				loadingpic.IsVisible = false;
				Boxblack.IsVisible = false;

				PopupNavigation.PopAsync();
			}
			else
			{
				await PopupNavigation.PushAsync(new SignupFailedPopup());
			}

		}
	}
}
```

#### **3, MVVM**

viewModels/SignUpVM

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using Cinema.API;
using Cinema.Models;
using System.Threading.Tasks;
using Xamarin.Forms;
using Cinema.PopupPage;
using Rg.Plugins.Popup.Services;
using Cinema.View;
using System.Linq;
using Xamarin.Essentials;

namespace Cinema.ViewModel
{
	public class SignUpVM : INotifyPropertyChanged
	{
		protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

		public event PropertyChangedEventHandler PropertyChanged;

		public UserDB userDB = new UserDB();


		public string username { get; set; }
		public string UserName
		{
			get { return username; }
			set
			{
				if (username != value)
				{
					username = value;
					NotifyPropertyChanged();
				}
			}
		}

		public string password { get; set; }
		public string Password
		{
			get { return password; }
			set
			{
				if (password != value)
				{
					password = value;
					NotifyPropertyChanged();
				}
			}
		}

		public string fullName { get; set; }
		public string FullName
		{
			get { return fullName; }
			set
			{
				if (fullName != value)
				{
					fullName = value;
					NotifyPropertyChanged();
				}
			}
		}

		public string email { get; set; }
		public string Email
		{
			get { return email; }
			set
			{
				if (email != value)
				{
					email = value;
					NotifyPropertyChanged();
				}
			}
		}

		public string phone { get; set; }
		public string Phone
		{
			get { return phone; }
			set
			{
				if (phone != value)
				{
					phone = value;
					NotifyPropertyChanged();
				}
			}
		}

		public Command CreateFunction { get; set; }

		public SignUpVM()
		{
			CreateFunction = new Command(async async => await GetCreate());
		}

		async Task GetCreate()
		{
			User user = new User()
			{
				Avatar = "avatar",
				Email = this.Email,
				FullName = this.FullName,
				Username = this.UserName,
				Password = this.Password,
				OneSignalOpen = true,
				Phone = this.Phone

			};

			//API Create
			await userDB.CreateUser(user);
			SignupPopup.PopupClose();
		}

		public async void CheckSignUp_New(string us, string pass, string email, string fullname, string phone)
		{
			User user = new User()
			{
				Avatar = "avatar",
				Email = email,
				FullName = fullname,
				Username = us,
				Password = pass,
				OneSignalOpen = true,
				Phone = phone

			};

			//API Create
			await userDB.CreateUser(user);
		}

	}
}
```



## **Study**

### PopAsync

```c#
private async void Button_Clicked(object sender, EventArgs e)
{
    await ((SfButton)sender).ScaleTo(0.9, 10, Easing.Linear); // Button Zoom Out
    await Task.Delay(10); // Wait for a while
    await ((SfButton)sender).ScaleTo(1, 10, Easing.Linear); // Button returns to original size

    PopupNavigation.PopAsync(); // Close Current Popup
}
```

```xml
<button:SfButton Text="Cancel" CornerRadius="10" HeightRequest="50" 
                 BackgroundColor="LightGray" FontAttributes="Bold"
                 Margin="0,5,0,0" TextColor="Black"
                 Clicked="Button_Clicked">
</button:SfButton>
```



### **PushAsync**

```c#
// When user registration fails, display a popup window
await PopupNavigation.PushAsync(new SignupFailedPopup());
```



### **Format**

```xml
<pages:PopupPage.Animation>
        <pages:MoveAnimation DurationIn="500"
                              DurationOut="500"
                              EasingIn="SpringIn"
                              EasingOut="SpringOut"
                              HasBackgroundAnimation="True"
                              PositionIn="Bottom"
                              PositionOut="Bottom">
							// Other Content
        </pages:MoveAnimation>
    </pages:PopupPage.Animation>
```



### **Other**

```c#
await PopupNavigation.PushAsync(new ForgetPasswordFailedPopup());
```





### Button Effect

**Bounce**

```c#
await ((SfButton)sender).ScaleTo(0.9, 10, Easing.Linear);
await Task.Delay(10);
await ((SfButton)sender).ScaleTo(1, 10, Easing.Linear);
```



### Redirect

```c#
Navigation.PushAsync(new MovieDetailPage(datafind.MovieID));
```

```c#
public MovieDetailPage(int MovieID)
```



### **Back**

```xml
<StackLayout Margin="10,5,10,10" VerticalOptions="EndAndExpand">
                        <button:SfButton Text="Back" CornerRadius="10" HeightRequest="50" 
                             BackgroundColor="LightGray" FontAttributes="Bold"  
                                 TextColor="Black" Clicked="Back">
                        </button:SfButton>
</StackLayout>
```

```c#
private async void Back(object sender, EventArgs e)
{
    await Navigation.PopAsync(); // Pop up the current page and return to the previous page
}
```







