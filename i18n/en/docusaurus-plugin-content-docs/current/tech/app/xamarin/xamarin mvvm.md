---
id: xamarin-mvvm
slug: /xamarin-mvvm
title: Xamarin MVVM
date: 2024-11-04
authors: Hoo
tags: [xamarin]
keywords: [xamarin]
---

## MVVM Usage

### Configuration

Updates are required when property values change

```c#
public class UserVM : INotifyPropertyChanged
{
	protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
	{
		PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
	}
	public event PropertyChangedEventHandler PropertyChanged;
    
    // Other MVVM Functions
}
```



### My project example:

`UserVM` example

```c#
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Cinema.API;
using Cinema.Models;
using Cinema.View;
using Xamarin.Essentials;

namespace Cinema.ViewModel
{
	public class UserVM : INotifyPropertyChanged
	{
        // Configuration
		protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

        // Configuration
		public event PropertyChangedEventHandler PropertyChanged;

        // Connect to API
		public static MovieDB Moviedb = new MovieDB();
        // Fetch data from API
		public static ObservableCollection<Movie> MovieList { get; set; } = Moviedb.GetAllMovie();

        // Fetch data from API
		public List<Movie> HotMovie { get; set; } = MovieList.OrderByDescending(x => x.RatingStar).Take(3).ToList();
        // Fetch data from API
		public List<string> SearName { get; set; } = MovieList.Select(x => x.Title).ToList();

        // Connect to API
		public static ActorDB Actordb = new ActorDB();
        // Fetch data from API
		public static ObservableCollection<Actor> ActorList { get; set; } = Actordb.GetAllActor_User();
        // Fetch data from API
		public List<Actor> ActorAvatar { get; set; } = ActorList.ToList();

        // Connect to API
		public static UserDB userDB = new UserDB();
        // Fetch data from API
		public static User userDB_Data = userDB.GetAllUser_One();

        // Define MVVM format
		public string UserFullname { get; set; } = userDB_Data.FullName;
		public string UserAvatar { get; set; } = userDB_Data.Avatar;
		public string UserEmail { get; set; } = userDB_Data.Email;

		public static User getUserdata()
		{
			string Username = Preferences.Get("Username", string.Empty);
			string Password = Preferences.Get("Password", string.Empty);
			var userData = userDB.GetAllUser();
			var data = userData.Where(x => x.Username == Username & x.Password == Password).FirstOrDefault();
			if (data != null)
			{
				return data;
			}
			return null;
		}

	}
}
```



`LoginVM` Example

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Cinema.API;
using Cinema.View;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Cinema.ViewModel
{
	public class LoginVM : INotifyPropertyChanged
	{
        // Configuration
		protected virtual void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

        // Configuration
		public event PropertyChangedEventHandler PropertyChanged;

        // Connect API
		public UserDB userDB = new UserDB();

        // Definition
		public string username { get; set; }
		public string Username
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

        // Definition
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

        // Definition MVVM function
		public Command LoginFunction { get; set; }

        // Configuration MVVM function
		public LoginVM()
		{
			LoginFunction = new Command(async async => await CheckLogin());
		}

        // Asynchronous Implementation MVVM function
		async Task CheckLogin()
		{
			UserDB userDB2 = new UserDB();
			var userData = userDB2.GetAllUser();
			var data = userData.Where(x => x.Username == this.Username & x.Password == this.Password).FirstOrDefault();
			if (data != null)
			{
				Preferences.Set("Username", this.Username);
				Preferences.Set("Password", this.Password);
				UserDB.userID = data.UserID;

                // Return to Home Page, Login Successful
				await Application.Current.MainPage.Navigation.PushAsync(new HomePage());
			}
		}

		public bool CheckLogin_New(string us, string pass)
		{
			UserDB userDB2 = new UserDB();
			var userData = userDB2.GetAllUser();
			var data = userData.Where(x => x.Username == us & x.Password == pass).FirstOrDefault();
			if (data != null)
			{
				Preferences.Set("Username", us);
				Preferences.Set("Password", pass);
				UserDB.userID = data.UserID;
				return true;
			}
			return false;
		}

	}

}
```



## Learning

### **Configure front-end usage**

```
// Configure MVVM in View
xmlns:vm="clr-namespace:Cinema.ViewModel"
```

```xml
// Connect your MVVM file and replace the file name with your own.
<ContentPage.Resources>
        <ResourceDictionary>
            <vm:UserVM x:Key="UserVM"/>
            <vm:FunctionVM x:Key="FunctionVM"/>
        </ResourceDictionary>
</ContentPage.Resources>
```

### **Definition**

BindingContext

```xml
<ScrollView BackgroundColor="#ECECEC">
     <StackLayout Padding="0,20,0,0"
                  HorizontalOptions="FillAndExpand" VerticalOptions="FillAndExpand" 
                  BindingContext="{StaticResource UserVM}">
    	// 其他内容都可以使用到 UserVM 里面的所有 Function
     </StackLayout>      
<</ScrollView>      
```

### **Avatar**

```xml
<abstractions:CircleImage Aspect="AspectFit"
                          WidthRequest="50"
                          HeightRequest="50"
                          HorizontalOptions="EndAndExpand"
                          Source="{Binding UserAvatar}"
                          Grid.Row="0"
                          Grid.Column="0" Grid.RowSpan="2"
                          Margin="0,0,10,0">
</abstractions:CircleImage>
```

### **Text**

```xml
<Label Text="{Binding UserFullname}" FontAttributes="Bold"
       Grid.Row="0" Grid.Column="1" TextColor="Black" FontSize="15"/>
```

### **Multi-data [0]**

```xml
<Image Source="{Binding HotMovie[0].MoviePoster}" Aspect="AspectFill"
                                       AbsoluteLayout.LayoutFlags="All"
                                       AbsoluteLayout.LayoutBounds="0,0,1,1"></Image>
```

### **Method B**

Configure VM files in the View backend Controller, but only one VM can be configured, not recommended

```c#
public ForgetPasswordPopup()
{
	InitializeComponent();
    // Global Assignment
    // Only one VM
	BindingContext = vm;
}
```

```xml
<Entry TextColor="Black" Text="{Binding Email}"/>
```



