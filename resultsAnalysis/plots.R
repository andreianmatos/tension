install.packages(c("ggplot2", "ggpubr", "tidyverse", "broom", "AICcmodavg"))
install.packages("openxlsx", dependencies = TRUE)
install.packages("readxl")
install.packages("paletteer")
install.packages("reshape2")
install.packages("paletteer") #not working
install.packages("devtools")
devtools::install_github("EmilHvitfeldt/paletteer")


library("openxlsx")
library(tidyverse)
library(ggpubr)
library(rstatix)
library(readr) 
library(ggplot2)
library(readxl)
library(paletteer)
require(reshape2)
library(lattice)
library(dplyr)
library(scales)
library(purrr) #to get map()
library("ggsci")
library(ggrepel)


# r graphs https://r-graph-gbothery.com/13-scatter-plot.html

excelDataPATH <- "C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\results.xlsx"
gridexcelDataPATH <- "C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\gridResults.xlsx"

databaseSavePATH <- "C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\databases"

excelDemographic <- "C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\demo.csv"

excelVolume <- "C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\volume.xlsx"
  
  
# DEMOGRAPHIC ######################################################################################################

demog <- read_csv(excelDemographic)

demog

gender <- demog[ , c('Gender:')]

genderCount <- aggregate(gender$`Gender:`, by=list(gender$`Gender:`), FUN=length)

genderCount[c("x")] <- lapply(genderCount[c("x")], function(x) x*100/60)

#create pie chart
ggplot(genderCount, aes(x="", y=x, fill=genderCount$Group.1)) +
  geom_bar(stat="identity", width=0.9) +
  coord_polar("y", start=0) +
  guides(fill = guide_legend(title = "Gender")) +
  scale_fill_grey()+
  labs(x='', y='', title='') +
  geom_label(aes(x=1.7,label = paste0(round(x,2), "%")), color = c("white", 1, 1),
             position = position_stack(vjust = 0.5),
             show.legend = FALSE) +
  theme_void()

age <- demog[ , c('Age:')]

ageCount <- aggregate(age$`Age:`, by=list(age$`Age:`), FUN=length)

#ageCount[c("x")] <- lapply(ageCount[c("x")], function(x) x*100/60)

dfage <- data.frame(ageCount)


ggplot(age, aes(x = age$`Age:`)) +                           # Basic ggplot2 histogram
  geom_histogram(color = "#ffffff", fill = "#000000")+
  theme_bw()+
  labs(x='Age', y='Frequency', title='') 

hist (age$`Age:`,
      xlab="Age",
      main="",
      xlim=c (10,50),
      ylim=c(0,50),col="#CC6666") + theme_bw()



# box plot
boxplot(age, col = "white",   xlab = "Age", horizontal = TRUE)+xlim(0, 50,2)
# Points
stripchart(age,              # Data
           method = "jitter", # Random noise
           pch = 19,          # Pch symbols
           col = '#CC6666',           # Color of the symbol
           vertical = FALSE,   # Vertical mode
           add = TRUE)  +
  guides(fill = guide_legend(title = "Screen Size")) +
  geom_label(aes(x=1.7,label = paste0(round(x), "%")), color = c("white", 1, 1),
             
             position = position_stack(vjust = 0.5),
             show.legend = FALSE) +
  theme_bw()

#create pie chart
ggplot(ageCount, aes(x="", y=x, fill=ageCount$'Group.1')) +
  geom_bar(stat="identity", width=0.9, color="black") +
  coord_polar("y", start=0) +
  theme_bw()+
  coord_polar("y", start=0) +
  geom_text(aes(x=1.6,label = paste0(round(x,2), "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) +
  scale_fill_manual(values=c('#666633', '#999966', '#307BA5'))+
  labs(x='Test Group', y='User Tests (%)', title='Gender') +
  theme_void()


training <- rbind(demog[4:7])
colnames(training)[1] <- "I dedicate my personal time to the visual arts."
colnames(training)[2] <- "I dedicate my personal time to the sonic arts."
colnames(training)[3] <- "I have been trained as a visual artist."
colnames(training)[4] <- "I have been trained as a musician."

trainingPercent1 <- training %>% group_by(training[1]) %>% summarise(Freq1=n())
trainingPercent2 <- training %>% group_by(training[2]) %>% summarise(Freq2=n())
trainingPercent3 <- training %>% group_by(training[3]) %>% summarise(Freq3=n())
trainingPercent4 <- training %>% group_by(training[4]) %>% summarise(Freq4=n())
trainingPercentF <- data.frame(type=rep(c('I dedicate my personal\ntime to the visual arts.',"I dedicate my personal\ntime to the sonic arts.","I have been trained\nas a visual artist.","I have been trained\nas a musician."), each=4),
                               values= rep(c('Not at All', 'Somewhat', 'To a Great Extent', 'Very Little')),
                               Freq = c(trainingPercent1$Freq1,trainingPercent2$Freq2,trainingPercent3$Freq3,trainingPercent4$Freq4)
                               )

trainingPercentF$values <- factor(trainingPercentF$values, 
                      levels = c("To a Great Extent", "Somewhat", "Very Little",
                                 "Not at All"))

ggplot(trainingPercentF,  aes(fill = values,
                         y=Freq*100/60,
                         x = type)) + 
  geom_bar(stat = "identity")+
  scale_fill_grey('')+
  labs(x='', y='Users (%)', title='', color='') +
  coord_flip()+
  theme_bw()


screen <- demog[ , c('What size is your screen?')]

screenCount <- aggregate(screen$`What size is your screen?`, by=list(screen$`What size is your screen?`), FUN=length)

screenCount$Group.1[5] <- "27''"

screenCount[c("x")] <- lapply(screenCount[c("x")], function(x) x*100/60)

      # Add it over

library(ggrepel)

#create pie chart
ggplot(screenCount, aes(x="", y=x, fill=screenCount$'Group.1')) +
  geom_bar(stat="identity", width=0.9) +
  coord_polar("y", start=0) +
  theme_bw()+
  guides(fill = guide_legend(title = "Screen Size")) +
  geom_label_repel(aes(x=1.3,label = paste0(round(screenCount$x,2), "%")), color = c("white", "white", 1,1,1,1),
             position = position_stack(vjust = 0.5),
             show.legend = FALSE) +
  scale_fill_manual(values=c('#666633', '#757547', '#999966','#ADAD84', '#CDCDB5', '#E6E6DA'))+
  labs(x='', y='', title='') +
  theme_bw()


volume <- read_excel(excelVolume, sheet = 1,range ="A1:A61") 


# Vertical box plot
boxplot(volume$vol, col = "white",   xlab = "Volume", horizontal = TRUE)+ylim(0, 100,10)
# Points
stripchart(volume$vol,              # Data
           method = "jitter", # Random noise
           pch = 19,          # Pch symbols
           col = '#CC6666',           # Color of the symbol
           vertical = FALSE,   # Vertical mode
           add = TRUE)  +
  guides(fill = guide_legend(title = "Screen Size")) +
  geom_label(aes(x=1.7,label = paste0(round(x), "%")), color = c("white", 1, 1),
             
             position = position_stack(vjust = 0.5),
             show.legend = FALSE) +
  theme_bw()



# WAVEFORM #########################################################################################################

#preparing data

#attack
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="C3:C63")
gp1tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="D3:D63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="G3:G63")
gp1tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="H3:H63")

#release
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="L3:L63")
gp2tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="M3:M63")
gp2least<- read_excel(excelDataPATH, sheet = 1,range ="P3:P63")
gp2tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="Q3:Q63")

#frequency
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="U3:U63")
gp3tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="V3:V63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="Y3:Y63")
gp3tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="Z3:Z63")

#amplitude
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="AD3:AD63")
gp4tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="AE3:AE63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="AH3:AH63")
gp4tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="AI3:AI63")


most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)
tensionMost <- rbind(gp1tensionmost,gp2tensionmost,gp3tensionmost,gp4tensionmost)
tensionLeast <- rbind(gp1tensionleast,gp2tensionleast,gp3tensionleast,gp4tensionleast)

waveform <- rbind(most, least)
tension <- rbind(tensionMost, tensionLeast)

waveform[waveform == 1.1] <- 'Sine'
waveform[waveform == 1.2] <- 'Triangle'
waveform[waveform == 1.3] <- 'Square'
waveform[waveform == 1.4] <- 'Sawtooth'
waveform[waveform == 2.1] <- 1.1
waveform[waveform == 2.2] <- 1.2
waveform[waveform == 2.3] <- 1.3
waveform[waveform == 2.4] <- 1.4

dfWaveform <- data.frame(x = waveform, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Attack', 'Release', 'Frequency', 'Amplitude'), each=60))

write.csv(dfWaveform, paste(databaseSavePATH,"\\tensionWaveform.csv",sep=""), row.names = FALSE)

ggplot(dfWaveform, aes(x = WAVEFORM, fill=Test_Group)) +
  geom_histogram(binwidth = 0.1)+
  labs(x='Waveform', y='Count', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_fill_manual(values=c("#F3672A","#005D5D","#9F1853","#118EE8"))+
  guides(fill = guide_legend(reverse=TRUE))+
  theme_bw()

ggplot(dfWaveform, aes(x = WAVEFORM)) +
  geom_histogram(binwidth = 0.1,fill = "#C4A45D",color="white")+
  labs(x='Waveform', y='Count', title='')+ 
  facet_grid(~tensionLevel)+ 
  theme_bw()


print(least)

# STACKED BAR CHART
# Data 

dfWaveformMostGeneral <- data.frame(type=rep(c('Sine', 'Triangle', 'Square','Sawtooth'), each=1),
                             values= c(length(which(most$WAVEFORM==1.1))/nrow(most),
                                       length(which(most$WAVEFORM==1.2))/nrow(most),
                                       length(which(most$WAVEFORM==1.3))/nrow(most),
                                       length(which(most$WAVEFORM==1.4))/nrow(most)
                             ))

dfWaveformMost <- data.frame(group=rep(c('Waveform x Attack', 'Waveform x Release', 'Waveform x Frequency','Waveform x Amplitude'), each=4),
                  type=rep(c('Sine', 'Triangle', 'Square','Sawtooth'), each=1),
                  values= c(length(which(gp1most$WAVEFORM==1.1))/nrow(gp1most),
                            length(which(gp1most$WAVEFORM==1.2))/nrow(gp1most),
                            length(which(gp1most$WAVEFORM==1.3))/nrow(gp1most),
                            length(which(gp1most$WAVEFORM==1.4))/nrow(gp1most),
                            length(which(gp2most$WAVEFORM==1.1))/nrow(gp2most),
                            length(which(gp2most$WAVEFORM==1.2))/nrow(gp2most),
                            length(which(gp2most$WAVEFORM==1.3))/nrow(gp2most),
                            length(which(gp2most$WAVEFORM==1.4))/nrow(gp2most),
                            length(which(gp3most$WAVEFORM==1.1))/nrow(gp3most),
                            length(which(gp3most$WAVEFORM==1.2))/nrow(gp3most),
                            length(which(gp3most$WAVEFORM==1.3))/nrow(gp3most),
                            length(which(gp3most$WAVEFORM==1.4))/nrow(gp3most),
                            length(which(gp4most$WAVEFORM==1.1))/nrow(gp4most),
                            length(which(gp4most$WAVEFORM==1.2))/nrow(gp4most),
                            length(which(gp4most$WAVEFORM==1.3))/nrow(gp4most),
                            length(which(gp4most$WAVEFORM==1.4))/nrow(gp4most)
                  ))

#print(dfWaveformMostGeneral)
#print(dfWaveformMost)

dfWaveformLeastGeneral <- data.frame(type=rep(c('Sine', 'Triangle', 'Square','Sawtooth'), each=1),
                                    values= c(length(which(least$WAVEFORM==2.1))/nrow(least),
                                              length(which(least$WAVEFORM==2.2))/nrow(least),
                                              length(which(least$WAVEFORM==2.3))/nrow(least),
                                              length(which(least$WAVEFORM==2.4))/nrow(least)
                                    ))

dfWaveformLeast <- data.frame(group=rep(c('Waveform x Attack', 'Waveform x Release', 'Waveform x Frequency','Waveform x Amplitude'), each=4),
                   type=rep(c('Sine', 'Triangle', 'Square','Sawtooth'), each=1),
                   values= c(length(which(gp1least$WAVEFORM==2.1))/nrow(gp1least),
                             length(which(gp1least$WAVEFORM==2.2))/nrow(gp1least),
                             length(which(gp1least$WAVEFORM==2.3))/nrow(gp1least),
                             length(which(gp1least$WAVEFORM==2.4))/nrow(gp1least),
                             length(which(gp2least$WAVEFORM==2.1))/nrow(gp1least),
                             length(which(gp2least$WAVEFORM==2.2))/nrow(gp1least),
                             length(which(gp2least$WAVEFORM==2.3))/nrow(gp1least),
                             length(which(gp2least$WAVEFORM==2.4))/nrow(gp1least),
                             length(which(gp3least$WAVEFORM==2.1))/nrow(gp1least),
                             length(which(gp3least$WAVEFORM==2.2))/nrow(gp1least),
                             length(which(gp3least$WAVEFORM==2.3))/nrow(gp1least),
                             length(which(gp3least$WAVEFORM==2.4))/nrow(gp1least),
                             length(which(gp4least$WAVEFORM==2.1))/nrow(gp1least),
                             length(which(gp4least$WAVEFORM==2.2))/nrow(gp1least),
                             length(which(gp4least$WAVEFORM==2.3))/nrow(gp1least),
                             length(which(gp4least$WAVEFORM==2.4))/nrow(gp1least)
                  ))

#print(dfWaveformLeast) 
#print(dfWaveformLeastGeneral) 

#Do not forget... to factor the type to order the waveformats accordingly
waveformMostplot <- ggplot(dfWaveformMost, aes(fill=factor(type,levels=c("Sine","Triangle","Square","Sawtooth")), y=values*100, x=group)) + 
  #ylim(0, 60)+ this line is for when not in percentage
  geom_bar(position='stack', stat='identity') +
  theme_minimal() + 
  labs(x='Test Group', y='User Tests (%)', title='Waveform By Test Groups for Most Tense') +
  theme(plot.title = element_text(hjust=0.5, size=20, face='bold')) +
  scale_fill_manual('Position', values=c('#D0E8F2', '#96C0D6', '#307BA5','#0F3045'))+
  #paletteer::scale_fill_paletteer_dynamic("cartography::blue.pal",8)+
  theme_bw()
waveformMostplot

waveformLeastplot <- ggplot(dfWaveformLeast, aes(fill=factor(type,levels=c("Sine","Triangle","Square","Sawtooth")), y=values*100, x=group)) + 
  #ylim(0, 60)+
  geom_bar(position='stack', stat='identity') +
  theme_minimal() + 
  labs(x='Test Group', y='User Tests (%)', title='Waveform By Test Groups for Least Tense') +
  theme(plot.title = element_text(hjust=0.5, size=20, face='bold')) +
  #paletteer::scale_fill_paletteer_d("tvthemes::Night")+
  scale_fill_manual('Position', values=c('#D0E8F2', '#96C0D6', '#307BA5','#0F3045'))+
  theme_bw()
waveformLeastplot


# now plotted overall

df2 <- dfWaveformMostGeneral %>% 
  mutate(csum = rev(cumsum(rev(values))), 
         pos = values/2 + lead(csum, 1),
         pos = if_else(is.na(pos), values/2, pos))

overallWaveformMost <- ggplot(dfWaveformMostGeneral, aes(x = "", y = values, fill=factor(type,levels=c("Sine","Triangle","Square","Sawtooth")))) +
  geom_col(width = 1, color = 1) +
  geom_label_repel(data = df2,
                   aes(y = pos, label = paste0(percent(values, accuracy = .01))),
                   size = 4.5, nudge_x = 1, show.legend = FALSE) +
  #geom_text(aes(label = percent(values, accuracy = 1)),
  #          position = position_stack(vjust = 0.5)) +
  coord_polar(theta = "y") +
  labs(x='', y='', title='Waveform for Most Tense') +
  guides(fill = guide_legend(title = "")) +
  scale_y_continuous(breaks = df2$pos, labels = dfWaveformMostGeneral$group) +
  scale_fill_manual('Position', values=c('#D0E8F2', '#96C0D6', '#307BA5','#0F3045'))+
  #paletteer::scale_fill_paletteer_d("tvthemes::Night")+
  theme_bw()

df2 <- dfWaveformLeastGeneral %>% 
  mutate(csum = rev(cumsum(rev(values))), 
         pos = values/2 + lead(csum, 1),
         pos = if_else(is.na(pos), values/2, pos))

overallWaveformLeast <- ggplot(dfWaveformLeastGeneral, aes(x = "", y = values, fill=factor(type,levels=c("Sine","Triangle","Square","Sawtooth")))) +
  geom_col(width = 1, color = 1) +
  geom_label_repel(data = df2,
                   aes(y = pos, label = paste0(percent(values, accuracy = .01))),
                   size = 4.5, nudge_x = 1, show.legend = FALSE) +
  coord_polar(theta = "y") +
  labs(x='', y='', title='Waveform for Least Tense') +
  guides(fill = guide_legend(title = "")) +
  scale_y_continuous(breaks = df2$pos, labels = dfWaveformLeastGeneral$group) +
  theme_bw() +
  scale_fill_manual('Position', values=c('#D0E8F2', '#96C0D6', '#307BA5','#0F3045'))
  


# FREQUENCY #########################################################################################################

#preparing data

#waveform
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="T3:T63")
gp1tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="V3:V63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="X3:X63")
gp1tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="Z3:Z63")

#attack
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="AV3:AV63")
gp2tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="AW3:AW63")
gp2least<- read_excel(excelDataPATH, sheet = 1,range ="AZ3:AZ63")
gp2tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="BA3:BA63")

#release
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="BN3:BN63")
gp3tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="BO3:BO63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="BR3:BR63")
gp3tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="BS3:BS63")

#amplitude
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="CE3:CE63")
gp4tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="CG3:CG63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="CI3:CI63")
gp4tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="CK3:CK63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)
tensionMost <- rbind(gp1tensionmost,gp2tensionmost,gp3tensionmost,gp4tensionmost)
tensionLeast <- rbind(gp1tensionleast,gp2tensionleast,gp3tensionleast,gp4tensionleast)

freq <- rbind(most, least)
tension <- rbind(tensionMost, tensionLeast)

dffrequency <- data.frame(x = freq, y = tension, group=rep(c('Frequency x Waveform', 'Frequency x Attack', 'Frequency x Release', 'Frequency x Amplitude'), each=60), tensionLevel=rep(c('Most', 'Least'), each=240))

write.csv(dffrequency, paste(databaseSavePATH,"\\tensionFrequency.csv",sep=""), row.names = FALSE)

##### 

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

frequency <- rbind(most, least)

frequency[frequency == 0] <- 1
frequency[frequency == 0.875] <- 2
frequency[frequency == 1.750] <- 3
frequency[frequency == 2.625] <- 4
frequency[frequency == 3.5] <- 4
frequency[frequency == 4.375] <- 5
frequency[frequency == 5.250] <- 6
frequency[frequency == 7] <- 8
frequency[frequency == 6.125] <- 7

dfFrequency <- data.frame(x = frequency, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Waveform', 'Attack', 'Release', 'Amplitude'), each=60))

ggplot(dfFrequency, aes(x = FREQUENCY, fill=Test_Group)) +
  geom_histogram(binwidth = 1)+
  labs(x='Frequency (note)', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_fill_manual(values=c("#F3672A","#005D5D","#9F1853","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  scale_x_continuous(breaks = seq(1, 8, 1))+
  theme_bw()

###

map_values <- function(x) {x * 7 / 10 }
gp1most <- data.frame(lapply(gp1most,map_values))
gp2most <- data.frame(lapply(gp2most,map_values))
gp3most <- data.frame(lapply(gp3most,map_values))
gp4most <- data.frame(lapply(gp4most,map_values))

#print(most)
map_values <- function(x) {x * 7 / 10 }
gp1least <- data.frame(lapply(gp1least,map_values))
gp2least <- data.frame(lapply(gp2least,map_values))
gp3least <- data.frame(lapply(gp3least,map_values))
gp4least <- data.frame(lapply(gp4least,map_values))

#print(least)

# STACKED BAR CHART
# Data 

dfFrequencyMostGeneral <- data.frame(type=rep(c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8'), each=1),
                                    values= c(length(which(most$FREQUENCY==0))/nrow(most),
                                              length(which(most$FREQUENCY!=0 & most$FREQUENCY<1))/nrow(most),
                                              length(which(most$FREQUENCY>1 & most$FREQUENCY<2))/nrow(most),
                                              length(which(most$FREQUENCY>2 & most$FREQUENCY<4))/nrow(most),
                                              length(which(most$FREQUENCY>4 & most$FREQUENCY<5))/nrow(most),
                                              length(which(most$FREQUENCY>5 & most$FREQUENCY<6))/nrow(most),
                                              length(which(most$FREQUENCY>6 & most$FREQUENCY<7))/nrow(most),
                                              length(which(most$FREQUENCY==7))/nrow(most)
                                    ))

dfFrequencyMost <- data.frame(group=rep(c('Frequency x Waveform', 'Frequency x Attack', 'Frequency x Release','Frequency x Amplitude'), each=8),
                             type=rep(c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8'), each=1),
                             values= c(length(which(gp1most$FREQUENCY==0))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY!=0 & gp1most$FREQUENCY<1))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY>1 & gp1most$FREQUENCY<2))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY>2 & gp1most$FREQUENCY<4))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY>4 & gp1most$FREQUENCY<5))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY>5 & gp1most$FREQUENCY<6))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY>6 & gp1most$FREQUENCY<7))/nrow(gp1most),
                                       length(which(gp1most$FREQUENCY==7))/nrow(gp1most),
                                       length(which(gp2most$FREQUENCY==0))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY!=0 & gp2most$FREQUENCY<1))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY>1 & gp2most$FREQUENCY<2))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY>2 & gp2most$FREQUENCY<4))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY>4 & gp2most$FREQUENCY<5))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY>5 & gp2most$FREQUENCY<6))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY>6 & gp2most$FREQUENCY<7))/nrow(gp2most),
                                       length(which(gp2most$FREQUENCY==7))/nrow(gp2most),
                                       length(which(gp3most$FREQUENCY==0))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY!=0 & gp3most$FREQUENCY<1))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY>1 & gp3most$FREQUENCY<2))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY>2 & gp3most$FREQUENCY<4))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY>4 & gp3most$FREQUENCY<5))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY>5 & gp3most$FREQUENCY<6))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY>6 & gp3most$FREQUENCY<7))/nrow(gp3most),
                                       length(which(gp3most$FREQUENCY==7))/nrow(gp3most),
                                       length(which(gp4most$FREQUENCY==0))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY!=0 & gp4most$FREQUENCY<1))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY>1 & gp4most$FREQUENCY<2))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY>2 & gp4most$FREQUENCY<4))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY>4 & gp4most$FREQUENCY<5))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY>5 & gp4most$FREQUENCY<6))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY>6 & gp4most$FREQUENCY<7))/nrow(gp4most),
                                       length(which(gp4most$FREQUENCY==7))/nrow(gp4most)
                             ))


#print(dfFrequencyMostGeneral)
#print(dfFrequencyMost)


dfFrequencyLeastGeneral <- data.frame(type=rep(c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8'), each=1),
                                    values= c(length(which(least$FREQUENCY==0))/nrow(least),
                                              length(which(least$FREQUENCY!=0 & least$FREQUENCY<1))/nrow(least),
                                              length(which(least$FREQUENCY>1 & least$FREQUENCY<2))/nrow(least),
                                              length(which(least$FREQUENCY>2 & least$FREQUENCY<4))/nrow(least),
                                              length(which(least$FREQUENCY>4 & least$FREQUENCY<5))/nrow(least),
                                              length(which(least$FREQUENCY>5 & least$FREQUENCY<6))/nrow(least),
                                              length(which(least$FREQUENCY>6 & least$FREQUENCY<7))/nrow(least),
                                              length(which(least$FREQUENCY==7))/nrow(least)
                                    ))

dfFrequencyLeast <- data.frame(group=rep(c('Frequency x Waveform', 'Frequency x Attack', 'Frequency x Release','Frequency x Amplitude'), each=8),
                             type=rep(c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8'), each=1),
                             values= c(length(which(gp1least$FREQUENCY==0))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY!=0 & gp1least$FREQUENCY<1))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY>1 & gp1least$FREQUENCY<2))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY>2 & gp1least$FREQUENCY<4))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY>4 & gp1least$FREQUENCY<5))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY>5 & gp1least$FREQUENCY<6))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY>6 & gp1least$FREQUENCY<7))/nrow(gp1least),
                                       length(which(gp1least$FREQUENCY==7))/nrow(gp1least),
                                       length(which(gp2least$FREQUENCY==0))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY!=0 & gp2least$FREQUENCY<1))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY>1 & gp2least$FREQUENCY<2))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY>2 & gp2least$FREQUENCY<4))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY>4 & gp2least$FREQUENCY<5))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY>5 & gp2least$FREQUENCY<6))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY>6 & gp2least$FREQUENCY<7))/nrow(gp2least),
                                       length(which(gp2least$FREQUENCY==7))/nrow(gp2least),
                                       length(which(gp3least$FREQUENCY==0))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY!=0 & gp3least$FREQUENCY<1))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY>1 & gp3least$FREQUENCY<2))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY>2 & gp3least$FREQUENCY<4))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY>4 & gp3least$FREQUENCY<5))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY>5 & gp3least$FREQUENCY<6))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY>6 & gp3least$FREQUENCY<7))/nrow(gp3least),
                                       length(which(gp3least$FREQUENCY==7))/nrow(gp3least),
                                       length(which(gp4least$FREQUENCY==0))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY!=0 & gp4least$FREQUENCY<1))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY>1 & gp4least$FREQUENCY<2))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY>2 & gp4least$FREQUENCY<4))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY>4 & gp4least$FREQUENCY<5))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY>5 & gp4least$FREQUENCY<6))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY>6 & gp4least$FREQUENCY<7))/nrow(gp4least),
                                       length(which(gp4least$FREQUENCY==7))/nrow(gp4least)
                             ))



#print(dfFrequencyLeast) 
#print(dfFrequencyLeastGeneral) 

frequencyMostplot <- ggplot(dfFrequencyMost, aes(fill=type, y=values, x=group)) + 
  #ylim(0, 60)+ this line is for when not in percentage
  geom_bar(position='stack', stat='identity') +
  theme_minimal() + 
  labs(x='Test Group', y='User Tests', title='Frequency By Test Groups for Most Tense') +
  theme(plot.title = element_text(hjust=0.5, size=20, face='bold')) +
  scale_fill_manual('Position', values=c('#DCF0F8', '#B9D8E7','#96C0D6','#6EA6C3',
                                         '#307BA5','#1E6085','#19506F','#0F3045'))+
  
  theme_bw() 
frequencyMostplot

#Do not forget... to factor the type to order the frequencyats accordingly
frequencyLeastplot <- ggplot(dfFrequencyLeast, aes(fill=type, y=values, x=group)) + 
  #ylim(0, 60)+ this line is for when not in percentage
  geom_bar(position='stack', stat='identity') +
  theme_minimal() + 
  labs(x='Test Group', y='User Tests', title='Frequency By Test Groups for Least Tense') +
  theme(plot.title = element_text(hjust=0.5, size=20, face='bold')) +
  scale_fill_manual('Position', values=c('#DCF0F8', '#B9D8E7','#96C0D6','#6EA6C3',
                                         '#307BA5','#1E6085','#19506F','#0F3045'))+
  theme_bw() 
frequencyLeastplot


# now plotted overall


df2 <- dfFrequencyMostGeneral %>% 
  mutate(csum = rev(cumsum(rev(values))), 
         pos = values/2 + lead(csum, 1),
         pos = if_else(is.na(pos), values/2, pos))

frequencyMostOverall <- ggplot(dfFrequencyMostGeneral, aes(x = "", y = values, fill=factor(type,levels=c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8')))) +
  geom_col(width = 1, color = 1) +
  geom_label_repel(data = df2,
                   aes(y = pos, label = paste0(percent(values, accuracy = .01))),
                   size = 4.5, nudge_x = 1, show.legend = FALSE) +
  coord_polar(theta = "y") +
  labs(x='', y='', title='Frequency for Most Tense') +
  guides(fill = guide_legend(title = "")) +
  scale_y_continuous(breaks = df2$pos, labels = dfFrequencyMostGeneral$group)+
  scale_fill_manual('Position', values=c('#DCF0F8', '#B9D8E7','#96C0D6','#6EA6C3',
                                         '#307BA5','#1E6085','#19506F','#0F3045'))+
  theme_bw()

#scale_fill_grey(start = 0.8, end = 0.2) 
#scale_fill_manual('Position', values=c('gray30', 'gray40', 'gray60','gray75',))+
  
df2 <- dfFrequencyLeastGeneral %>% 
  mutate(csum = rev(cumsum(rev(values))), 
         pos = values/2 + lead(csum, 1),
         pos = if_else(is.na(pos), values/2, pos))

frequencyLeastOverall <- ggplot(dfFrequencyLeastGeneral, aes(x = "", y = values, fill=factor(type,levels=c('C1', 'C2', 'C3','C4','C5', 'C6', 'C7','C8')))) +
  geom_col(width = 1, color = 1) +
  #geom_text(aes(label = percent(values, accuracy = 1)),
  #          position = position_stack(vjust = 0.5)) +
  coord_polar(theta = "y") +
  geom_label_repel(data = df2,
                   aes(y = pos, label = paste0(percent(values, accuracy = .01))),
                   size = 4.5, nudge_x = 1, show.legend = FALSE) +
  guides(fill = guide_legend(title = "Group")) +
  labs(x='', y='', title='Frequency for Least Tense') +
  guides(fill = guide_legend(title = "")) +
  scale_y_continuous(breaks = df2$pos, labels = dfFrequencyLeastGeneral$group)+
  scale_fill_manual('Position', values=c('#DCF0F8', '#B9D8E7','#96C0D6','#6EA6C3',
                                         '#307BA5','#1E6085','#19506F','#0F3045'))+ 
  
  theme_bw()


# TENSION #########################################################################################################

#preparing data

#VISUAL TENSION values for MOST tense 
visualgp1most <- read_excel(excelDataPATH, sheet = 1,range ="CP3:CP63")
visualgp2most <- read_excel(excelDataPATH, sheet = 1,range ="CY3:CY63")
visualgp3most <- read_excel(excelDataPATH, sheet = 1,range ="DH3:DH63")
visualgp4most <- read_excel(excelDataPATH, sheet = 1,range ="DQ3:DQ63")
visualgp5most <- read_excel(excelDataPATH, sheet = 1,range ="DZ3:DZ63")
visualgp6most <- read_excel(excelDataPATH, sheet = 1,range ="EI3:EI63")
visualgp7most <- read_excel(excelDataPATH, sheet = 1,range ="ER3:ER63")
visualgp8most <- read_excel(excelDataPATH, sheet = 1,range ="FA3:FA63")
visualgp9most <- read_excel(excelDataPATH, sheet = 1,range ="FJ3:FJ63")
visualgp10most <- read_excel(excelDataPATH, sheet = 1,range ="FS3:FS63")

visualmost <- rbind(visualgp1most,visualgp2most,visualgp3most,visualgp4most,visualgp5most,
                   visualgp6most,visualgp7most,visualgp8most,visualgp9most,visualgp10most)


print(visualmost)

#VISUAL TENSION values for LEAST tense 
visualgp1least <- read_excel(excelDataPATH, sheet = 1,range ="CT3:CT63")
visualgp2least <- read_excel(excelDataPATH, sheet = 1,range ="DC3:DC63")
visualgp3least <- read_excel(excelDataPATH, sheet = 1,range ="DL3:DL63")
visualgp4least <- read_excel(excelDataPATH, sheet = 1,range ="DU3:DU63")
visualgp5least <- read_excel(excelDataPATH, sheet = 1,range ="ED3:ED63")
visualgp6least <- read_excel(excelDataPATH, sheet = 1,range ="EM3:EM63")
visualgp7least <- read_excel(excelDataPATH, sheet = 1,range ="EV3:EV63")
visualgp8least <- read_excel(excelDataPATH, sheet = 1,range ="FE3:FE63")
visualgp9least <- read_excel(excelDataPATH, sheet = 1,range ="FN3:FN63")
visualgp10least <- read_excel(excelDataPATH, sheet = 1,range ="FW3:FW63")

visualleast <- rbind(visualgp1least,visualgp2least,visualgp3least,visualgp4least,visualgp5least,
                   visualgp6least,visualgp7least,visualgp8least,visualgp9least,visualgp10least)

print(visualleast)

visualboth <- rbind(visualmost, visualleast)
print(visualboth)

#SONIC TENSION values for MOST tense 
soundgp1most <- read_excel(excelDataPATH, sheet = 1,range ="D3:D63")
soundgp2most <- read_excel(excelDataPATH, sheet = 1,range ="M3:M63")
soundgp3most <- read_excel(excelDataPATH, sheet = 1,range ="V3:V63")
soundgp4most <- read_excel(excelDataPATH, sheet = 1,range ="AE3:AE63")
soundgp5most <- read_excel(excelDataPATH, sheet = 1,range ="AN3:AN63")
soundgp6most <- read_excel(excelDataPATH, sheet = 1,range ="AW3:AW63")
soundgp7most <- read_excel(excelDataPATH, sheet = 1,range ="BF3:BF63")
soundgp8most <- read_excel(excelDataPATH, sheet = 1,range ="BO3:BO63")
soundgp9most <- read_excel(excelDataPATH, sheet = 1,range ="BX3:BX63")
soundgp10most <- read_excel(excelDataPATH, sheet = 1,range ="CG3:CG63")

soundmost <- rbind(soundgp1most,soundgp2most,soundgp3most,soundgp4most,soundgp5most,
                   soundgp6most,soundgp7most,soundgp8most,soundgp9most,soundgp10most)

print(soundmost)

#SONIC TENSION values for LEAST tense 
soundgp1least <- read_excel(excelDataPATH, sheet = 1,range ="H3:H63")
soundgp2least <- read_excel(excelDataPATH, sheet = 1,range ="Q3:Q63")
soundgp3least <- read_excel(excelDataPATH, sheet = 1,range ="Z3:Z63")
soundgp4least <- read_excel(excelDataPATH, sheet = 1,range ="AI3:AI63")
soundgp5least <- read_excel(excelDataPATH, sheet = 1,range ="AR3:AR63")
soundgp6least <- read_excel(excelDataPATH, sheet = 1,range ="BA3:BA63")
soundgp7least <- read_excel(excelDataPATH, sheet = 1,range ="BJ3:BJ63")
soundgp8least <- read_excel(excelDataPATH, sheet = 1,range ="BS3:BS63")
soundgp9least <- read_excel(excelDataPATH, sheet = 1,range ="CB3:CB63")
soundgp10least <- read_excel(excelDataPATH, sheet = 1,range ="CK3:CK63")

soundleast <- rbind(soundgp1least,soundgp2least,soundgp3least,soundgp4least,soundgp5least,
                    soundgp6least,soundgp7least,soundgp8least,soundgp9least,soundgp10least)

print(soundleast)

soundboth <- rbind(soundmost, soundleast)
print(soundboth)


tension21most <- read_excel(excelDataPATH, sheet = 1,range ="GE3:GE63")
tension21least <- read_excel(excelDataPATH, sheet = 1,range ="GL3:GL63")
tension22most <- read_excel(excelDataPATH, sheet = 1,range ="GT3:GT63")
tension22least <- read_excel(excelDataPATH, sheet = 1,range ="HA3:HA63")

soundAndVisualBoth <- rbind(soundboth, visualboth)


#DENSITY COMPARISON - overall tension values

dfboth <- data.frame(tensionLevel=rep(c('Sound Most', 'Sound Least','Visual Most', 'Visual Least'), each=600),
                       tensionValues= c(soundAndVisualBoth))
dfboth <- na.omit(dfboth)

dfboth2 <- transform(
  dfboth, type= ifelse(tensionLevel=='Sound Most' | tensionLevel=='Sound Least', 'Sound', 'Visual'))


dfbothcount <- dfboth2 %>% group_by(TENSION, tensionLevel,type) %>% summarise(Freq=n())


print(dfboth)

library(ggplot2)

soundAndVisualTension <- ggplot(dfboth, aes(x=tensionLevel, y=TENSION, fill = tensionLevel)) + 
  coord_flip()+
  geom_violin(trim=FALSE) +
  ylim(0, 10)+
  scale_y_continuous(breaks=seq(1,10,by=1))+
  scale_fill_manual(values=c('#DCF0F8','#96C0D6','#307BA5','#19506F'))+
  labs(x='', y='Tension Value', title='Tension Value By Tension Level for Sound and Visual Tests') +
  scale_x_discrete(labels = NULL, breaks = NULL) +
  theme_bw()


ggplot(dfbothcount,  aes(fill = tensionLevel,
                         y=Freq*100/2400,
                         x = TENSION)) + 
  geom_bar(stat = "identity")+
  #geom_bar(stat = "identity", position='dodge')+
  #facet_wrap(~ type)+
  scale_x_continuous(breaks = seq(0, 10, 1))+
  scale_fill_manual("",values = c("#c57497","#9f1853", "#669d9d","#005d5d"))+
  labs(x='Tension', y='Test\'s Percentage', title='') +

  theme_bw()


 #maybe um de barras colorido pela frequencia?? tipo os de waveform... nah

######### AROUSAL + PLEASURE + TENSION

#for MOST tense, SOUND
arousalGridgp1most <- read_excel(gridexcelDataPATH, sheet = 1,range ="F3:F63")
arousalGridgp2most <- read_excel(gridexcelDataPATH, sheet = 1,range ="S3:S63")
arousalGridgp3most <- read_excel(gridexcelDataPATH, sheet = 1,range ="AF3:AF63")
arousalGridgp4most <- read_excel(gridexcelDataPATH, sheet = 1,range ="AS3:AS63")
arousalGridgp5most <- read_excel(gridexcelDataPATH, sheet = 1,range ="BF3:BF63")
arousalGridgp6most <- read_excel(gridexcelDataPATH, sheet = 1,range ="BS3:BS63")
arousalGridgp7most <- read_excel(gridexcelDataPATH, sheet = 1,range ="CF3:CF63")
arousalGridgp8most <- read_excel(gridexcelDataPATH, sheet = 1,range ="CS3:CS63")
arousalGridgp9most <- read_excel(gridexcelDataPATH, sheet = 1,range ="DF3:DF63")
arousalGridgp10most <- read_excel(gridexcelDataPATH, sheet = 1,range ="DS3:DS63")

arousalGridSoundmost <- rbind(arousalGridgp1most,arousalGridgp2most,arousalGridgp3most,arousalGridgp4most,arousalGridgp5most,
                   arousalGridgp6most,arousalGridgp7most,arousalGridgp8most,arousalGridgp9most,arousalGridgp10most)

print(arousalGridgp2most)

#for LEAST tense 
arousalGridgp1least <- read_excel(gridexcelDataPATH, sheet = 1,range ="L3:L63")
arousalGridgp2least <- read_excel(gridexcelDataPATH, sheet = 1,range ="Y3:Y63")
arousalGridgp3least <- read_excel(gridexcelDataPATH, sheet = 1,range ="AL3:AL63")
arousalGridgp4least <- read_excel(gridexcelDataPATH, sheet = 1,range ="AY3:AY63")
arousalGridgp5least <- read_excel(gridexcelDataPATH, sheet = 1,range ="BL3:BL63")
arousalGridgp6least <- read_excel(gridexcelDataPATH, sheet = 1,range ="BY3:BY63")
arousalGridgp7least <- read_excel(gridexcelDataPATH, sheet = 1,range ="CL3:CL63")
arousalGridgp8least <- read_excel(gridexcelDataPATH, sheet = 1,range ="CY3:CY63")
arousalGridgp9least <- read_excel(gridexcelDataPATH, sheet = 1,range ="DL3:DL63")
arousalGridgp10least <- read_excel(gridexcelDataPATH, sheet = 1,range ="DY3:DY63")

arousalGridSoundleast <- rbind(arousalGridgp1least,arousalGridgp2least,arousalGridgp3least,arousalGridgp4least,arousalGridgp5least,
                    arousalGridgp6least,arousalGridgp7least,arousalGridgp8least,arousalGridgp9least,arousalGridgp10least)

print(arousalGridleast)


#for MOST tense VISUAL 
arousalGridgp1most <- read_excel(gridexcelDataPATH, sheet = 1,range ="EF3:EF63")
arousalGridgp2most <- read_excel(gridexcelDataPATH, sheet = 1,range ="ES3:ES63")
arousalGridgp3most <- read_excel(gridexcelDataPATH, sheet = 1,range ="FF3:FF63")
arousalGridgp4most <- read_excel(gridexcelDataPATH, sheet = 1,range ="FS3:FS63")
arousalGridgp5most <- read_excel(gridexcelDataPATH, sheet = 1,range ="GF3:GF63")
arousalGridgp6most <- read_excel(gridexcelDataPATH, sheet = 1,range ="GS3:GS63")
arousalGridgp7most <- read_excel(gridexcelDataPATH, sheet = 1,range ="HF3:HF63")
arousalGridgp8most <- read_excel(gridexcelDataPATH, sheet = 1,range ="HS3:HS63")
arousalGridgp9most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IF3:IF63")
arousalGridgp10most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IS3:IS63")

arousalGridVisualmost <- rbind(arousalGridgp1most,arousalGridgp2most,arousalGridgp3most,arousalGridgp4most,arousalGridgp5most,
                         arousalGridgp6most,arousalGridgp7most,arousalGridgp8most,arousalGridgp9most,arousalGridgp10most)

print(arousalGridmost)

#for LEAST tense VISUAL
arousalGridgp1least <- read_excel(gridexcelDataPATH, sheet = 1,range ="EL3:EL63")
arousalGridgp2least <- read_excel(gridexcelDataPATH, sheet = 1,range ="EY3:EY63")
arousalGridgp3least <- read_excel(gridexcelDataPATH, sheet = 1,range ="FL3:FL63")
arousalGridgp4least <- read_excel(gridexcelDataPATH, sheet = 1,range ="FY3:FY63")
arousalGridgp5least <- read_excel(gridexcelDataPATH, sheet = 1,range ="GL3:GL63")
arousalGridgp6least <- read_excel(gridexcelDataPATH, sheet = 1,range ="GY3:GY63")
arousalGridgp7least <- read_excel(gridexcelDataPATH, sheet = 1,range ="HL3:HL63")
arousalGridgp8least <- read_excel(gridexcelDataPATH, sheet = 1,range ="HY3:HY63")
arousalGridgp9least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IL3:IL63")
arousalGridgp10least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IY3:IY63")

arousalGridgp8least <- read_excel(gridexcelDataPATH, sheet = 1,range ="HY3:HY63")
arousalGridgp9least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IL3:IL63")
arousalGridgp10least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IY3:IY63")

arousalGridgp21most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IL3:IL63")
arousalGridgp21least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IY3:IY63")
arousalGridgp22most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IL3:IL63")
arousalGridgp22least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IY3:IY63")


arousalGridVisualleast <- rbind(arousalGridgp1least,arousalGridgp2least,arousalGridgp3least,arousalGridgp4least,arousalGridgp5least,
                          arousalGridgp6least,arousalGridgp7least,arousalGridgp8least,arousalGridgp9least,arousalGridgp10least)

print(arousalGridOverall)

arousalGridOverall <- rbind(arousalGridSoundmost,arousalGridSoundleast,arousalGridVisualmost,arousalGridVisualleast)



install.packages("hexbin")
library(hexbin)

dfTensionArousalSoundMost <- data.frame(x = soundmost, y = arousalGridSoundmost)
dfTensionArousalSoundLeast <- data.frame(x = soundleast, y = arousalGridSoundleast)
dfTensionArousalVisualMost <- data.frame(x = visualmost, y = arousalGridVisualmost)
dfTensionArousalVisualLeast <- data.frame(x = visualleast, y = arousalGridVisualleast)
dfTensionArousalBoth <- data.frame(x = soundAndVisualBoth, y = arousalGridOverall)


## CORRELATION BETWEEN TENSION AND GRID CELL


nrGridgp1most <- read_excel(excelDataPATH, sheet = 1,range ="E3:E63")
nrGridgp2most <- read_excel(excelDataPATH, sheet = 1,range ="N3:N63")
nrGridgp3most <- read_excel(excelDataPATH, sheet = 1,range ="W3:W63")
nrGridgp4most <- read_excel(excelDataPATH, sheet = 1,range ="AF3:AF63")
nrGridgp5most <- read_excel(excelDataPATH, sheet = 1,range ="AO3:AO63")
nrGridgp6most <- read_excel(excelDataPATH, sheet = 1,range ="AX3:AX63")
nrGridgp7most <- read_excel(excelDataPATH, sheet = 1,range ="BG3:BG63")
nrGridgp8most <- read_excel(excelDataPATH, sheet = 1,range ="BP3:BP63")
nrGridgp9most <- read_excel(excelDataPATH, sheet = 1,range ="BY3:BY63")
nrGridgp10most <- read_excel(excelDataPATH, sheet = 1,range ="CH3:CH63")

nrGridgp1least <- read_excel(excelDataPATH, sheet = 1,range ="I3:I63")
nrGridgp2least <- read_excel(excelDataPATH, sheet = 1,range ="R3:R63")
nrGridgp3least <- read_excel(excelDataPATH, sheet = 1,range ="AA3:AA63")
nrGridgp4least <- read_excel(excelDataPATH, sheet = 1,range ="AJ3:AJ63")
nrGridgp5least <- read_excel(excelDataPATH, sheet = 1,range ="AS3:AS63")
nrGridgp6least <- read_excel(excelDataPATH, sheet = 1,range ="BB3:BB63")
nrGridgp7least <- read_excel(excelDataPATH, sheet = 1,range ="BK3:BK63")
nrGridgp8least <- read_excel(excelDataPATH, sheet = 1,range ="BT3:BT63")
nrGridgp9least <- read_excel(excelDataPATH, sheet = 1,range ="CC3:CC63")
nrGridgp10least <- read_excel(excelDataPATH, sheet = 1,range ="CL3:CL63")

vnrGridgp1most <- read_excel(excelDataPATH, sheet = 1,range ="CQ3:CQ63")
vnrGridgp2most <- read_excel(excelDataPATH, sheet = 1,range ="CZ3:CZ63")
vnrGridgp3most <- read_excel(excelDataPATH, sheet = 1,range ="DI3:DI63")
vnrGridgp4most <- read_excel(excelDataPATH, sheet = 1,range ="DR3:DR63")
vnrGridgp5most <- read_excel(excelDataPATH, sheet = 1,range ="EA3:EA63")
vnrGridgp6most <- read_excel(excelDataPATH, sheet = 1,range ="EJ3:EJ63")
vnrGridgp7most <- read_excel(excelDataPATH, sheet = 1,range ="ES3:ES63")
vnrGridgp8most <- read_excel(excelDataPATH, sheet = 1,range ="FB3:FB63")
vnrGridgp9most <- read_excel(excelDataPATH, sheet = 1,range ="FK3:FK63")
vnrGridgp10most <- read_excel(excelDataPATH, sheet = 1,range ="FT3:FT63")

vnrGridgp1least <- read_excel(excelDataPATH, sheet = 1,range ="CU3:CU63")
vnrGridgp2least <- read_excel(excelDataPATH, sheet = 1,range ="DD3:DD63")
vnrGridgp3least <- read_excel(excelDataPATH, sheet = 1,range ="DM3:DM63")
vnrGridgp4least <- read_excel(excelDataPATH, sheet = 1,range ="DV3:DV63")
vnrGridgp5least <- read_excel(excelDataPATH, sheet = 1,range ="EE3:EE63")
vnrGridgp6least <- read_excel(excelDataPATH, sheet = 1,range ="EN3:EN63")
vnrGridgp7least <- read_excel(excelDataPATH, sheet = 1,range ="EW3:EW63")
vnrGridgp8least <- read_excel(excelDataPATH, sheet = 1,range ="FF3:FF63")
vnrGridgp9least <- read_excel(excelDataPATH, sheet = 1,range ="FO3:FO63")
vnrGridgp10least <- read_excel(excelDataPATH, sheet = 1,range ="FX3:FX63")

vnrGridgp21least <- read_excel(excelDataPATH, sheet = 1,range ="GM3:GM63")
vnrGridgp21most <- read_excel(excelDataPATH, sheet = 1,range ="GF3:GF63")
vnrGridgp22least <- read_excel(excelDataPATH, sheet = 1,range ="HB3:HB63")
vnrGridgp22most <- read_excel(excelDataPATH, sheet = 1,range ="GU3:GU63")


gridNumbers <- rbind(nrGridgp1most,nrGridgp2most,nrGridgp3most,nrGridgp4most,nrGridgp5most,nrGridgp6most,nrGridgp7most,nrGridgp8most, nrGridgp9most,nrGridgp10most,
                     nrGridgp1least,nrGridgp2least,nrGridgp3least,nrGridgp4least,nrGridgp5least,nrGridgp6least,nrGridgp7least,nrGridgp8least, nrGridgp9least,nrGridgp10least,
                     vnrGridgp1most,vnrGridgp2most,vnrGridgp3most,vnrGridgp4most,vnrGridgp5most,vnrGridgp6most,vnrGridgp7most,vnrGridgp8most, vnrGridgp9most,vnrGridgp10most,
                     vnrGridgp1least,vnrGridgp2least,vnrGridgp3least,vnrGridgp4least,vnrGridgp5least,vnrGridgp6least,vnrGridgp7least,vnrGridgp8least, vnrGridgp9least,vnrGridgp10least)

dfTensionGrid <- data.frame(grid=c(gridNumbers),
                     tension= c(soundAndVisualBoth))

group_mean <- aggregate(dfTensionGrid$TENSION, list(dfTensionGrid$AFFECT.GRID), mean)
warninmean_values =  as.matrix(group_mean$x) 
mean_values = c(8.986607, 7.634615, 6.160000,4.038462, 6.153846,
                7.404580, 5.984772, 4.389831 , 3.250000, 3.166667,
                6.200000, 4.670051, 2.875502, 2.213235, 1.407407 ,
                5.758621, 4.291667, 2.519608 , 1.808219, 1.54321,
                3.777778, 3.466667, 1.807229, 1.530303, 1.183206
                )
mean_values = c(3.777778, 5.758621, 6.200000,7.404580, 8.986607,
                3.466667, 4.291667, 4.670051 , 5.984772, 7.634615,
                1.807229, 2.213235, 2.875502, 4.389831, 6.160000 ,
                1.530303, 1.808219, 2.213235 , 3.250000, 4.038462,
                1.183206, 1.54321, 1.407407, 3.166667, 6.153846
            )
print(mean_values)

m <- matrix(mean_values, 5, 5)
colnames(m) <- paste("", 1:5)
rownames(m) <- paste("", 1:5)
print(m)

df <- melt(m)
colnames(df) <- c("Arousal", "Pleasure", "value")

print(df)

ggplot(df, aes(x = Pleasure, y = Arousal, fill = value)) +
  geom_tile() +
  coord_fixed() +   
  scale_fill_continuous(high = "#000000", low = "#cccccc")+
guides(fill = guide_colourbar(title="Tension",barwidth = 0.5,
                                barheight = 20))+
  theme_bw()+
  geom_tile(color = "white",
            lwd = 1.5,
            linetype = 1) 


dfGridCount <- aggregate(gridNumbers$`AFFECT GRID`, by=list(gridNumbers$`AFFECT GRID`), FUN=length)

counts = c(9, 29, 90, 131, 224,
                15, 96, 197 , 197, 52,
                83, 102, 249, 59, 25 ,
                66, 219, 136 , 72, 26,
                131, 81, 54, 24, 13
)

m <- matrix(counts, 5, 5)
colnames(m) <- paste("", 1:5)
rownames(m) <- paste("", 1:5)
print(m)

df <- melt(m)
colnames(df) <- c("Arousal", "Pleasure", "count")

print(df)

ggplot(df, aes(x = Pleasure, y = Arousal, fill = count)) +
  geom_tile() +
  coord_fixed() +   
  scale_fill_continuous(high = "#000000", low = "#cccccc")+
  guides(fill = guide_colourbar(title="Incidence",barwidth = 0.5,
                                barheight = 20))+
  theme_bw()


library(RColorBrewer)
mycols <- brewer.pal(9, "Blues")
mycols[1] <- '#FFFFFF'
mycols[2] <- '#C4E0EC'
mycols[3] <- '#A1C8DC'
mycols[4] <- '#7EB0CB'
mycols[5] <- '#5F9BBC'
mycols[6] <- '#4086AD'
mycols[7] <- '#236F9A'
mycols[8] <- '#19506F'
mycols[9] <- '#14405A'
mycols[10] <- '#0B2130'
mycols[11] <- '#000000'


ggplot(dfTensionArousalBoth, aes(x = TENSION, y = AROUSAL)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)+
  labs(x='Tension', y='Arousal', title='Arousal & Tension Correlation for All Tests') +
  theme_bw()

ggplot(dfTensionArousalSoundMost, aes(x = TENSION, y = AROUSAL)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionArousalVisualLeast, aes(x = TENSION, y = AROUSAL)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionArousalVisualMost, aes(x = TENSION, y = AROUSAL)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionArousalBoth, aes(x = TENSION, y = AROUSAL)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)

#for MOST tense, SOUND
pleasureGridgp1most <- read_excel(gridexcelDataPATH, sheet = 1,range ="G3:G63")
pleasureGridgp2most <- read_excel(gridexcelDataPATH, sheet = 1,range ="T3:T63")
pleasureGridgp3most <- read_excel(gridexcelDataPATH, sheet = 1,range ="AG3:AG63")
pleasureGridgp4most <- read_excel(gridexcelDataPATH, sheet = 1,range ="AT3:AT63")
pleasureGridgp5most <- read_excel(gridexcelDataPATH, sheet = 1,range ="BG3:BG63")
pleasureGridgp6most <- read_excel(gridexcelDataPATH, sheet = 1,range ="BT3:BT63")
pleasureGridgp7most <- read_excel(gridexcelDataPATH, sheet = 1,range ="CG3:CG63")
pleasureGridgp8most <- read_excel(gridexcelDataPATH, sheet = 1,range ="CT3:CT63")
pleasureGridgp9most <- read_excel(gridexcelDataPATH, sheet = 1,range ="DG3:DG63")
pleasureGridgp10most <- read_excel(gridexcelDataPATH, sheet = 1,range ="DT3:DT63")

pleasureGridSoundmost <- rbind(pleasureGridgp1most,pleasureGridgp2most,pleasureGridgp3most,pleasureGridgp4most,pleasureGridgp5most,
                              pleasureGridgp6most,pleasureGridgp7most,pleasureGridgp8most,pleasureGridgp9most,pleasureGridgp10most)

print(pleasureGridgp2most)

#for LEAST tense 
pleasureGridgp1least <- read_excel(gridexcelDataPATH, sheet = 1,range ="M3:M63")
pleasureGridgp2least <- read_excel(gridexcelDataPATH, sheet = 1,range ="Z3:Z63")
pleasureGridgp3least <- read_excel(gridexcelDataPATH, sheet = 1,range ="AM3:AM63")
pleasureGridgp4least <- read_excel(gridexcelDataPATH, sheet = 1,range ="AZ3:AZ63")
pleasureGridgp5least <- read_excel(gridexcelDataPATH, sheet = 1,range ="BM3:BM63")
pleasureGridgp6least <- read_excel(gridexcelDataPATH, sheet = 1,range ="BZ3:BZ63")
pleasureGridgp7least <- read_excel(gridexcelDataPATH, sheet = 1,range ="CM3:CM63")
pleasureGridgp8least <- read_excel(gridexcelDataPATH, sheet = 1,range ="CZ3:CZ63")
pleasureGridgp9least <- read_excel(gridexcelDataPATH, sheet = 1,range ="DM3:DM63")
pleasureGridgp10least <- read_excel(gridexcelDataPATH, sheet = 1,range ="DZ3:DZ63")

pleasureGridSoundleast <- rbind(pleasureGridgp1least,pleasureGridgp2least,pleasureGridgp3least,pleasureGridgp4least,pleasureGridgp5least,
                               pleasureGridgp6least,pleasureGridgp7least,pleasureGridgp8least,pleasureGridgp9least,pleasureGridgp10least)

print(pleasureGridleast)


#for MOST tense VISUAL 
pleasureGridgp1most <- read_excel(gridexcelDataPATH, sheet = 1,range ="EG3:EG63")
pleasureGridgp2most <- read_excel(gridexcelDataPATH, sheet = 1,range ="ET3:ET63")
pleasureGridgp3most <- read_excel(gridexcelDataPATH, sheet = 1,range ="FG3:FG63")
pleasureGridgp4most <- read_excel(gridexcelDataPATH, sheet = 1,range ="FT3:FT63")
pleasureGridgp5most <- read_excel(gridexcelDataPATH, sheet = 1,range ="GG3:GG63")
pleasureGridgp6most <- read_excel(gridexcelDataPATH, sheet = 1,range ="GT3:GT63")
pleasureGridgp7most <- read_excel(gridexcelDataPATH, sheet = 1,range ="HG3:HG63")
pleasureGridgp8most <- read_excel(gridexcelDataPATH, sheet = 1,range ="HT3:HT63")
pleasureGridgp9most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IG3:IG63")
pleasureGridgp10most <- read_excel(gridexcelDataPATH, sheet = 1,range ="IT3:IT63")

pleasureGridVisualmost <- rbind(pleasureGridgp1most,pleasureGridgp2most,pleasureGridgp3most,pleasureGridgp4most,pleasureGridgp5most,
                               pleasureGridgp6most,pleasureGridgp7most,pleasureGridgp8most,pleasureGridgp9most,pleasureGridgp10most)

print(pleasureGridmost)

#for LEAST tense VISUAL
pleasureGridgp1least <- read_excel(gridexcelDataPATH, sheet = 1,range ="EM3:EM63")
pleasureGridgp2least <- read_excel(gridexcelDataPATH, sheet = 1,range ="EZ3:EZ63")
pleasureGridgp3least <- read_excel(gridexcelDataPATH, sheet = 1,range ="FM3:FM63")
pleasureGridgp4least <- read_excel(gridexcelDataPATH, sheet = 1,range ="FZ3:FZ63")
pleasureGridgp5least <- read_excel(gridexcelDataPATH, sheet = 1,range ="GM3:GM63")
pleasureGridgp6least <- read_excel(gridexcelDataPATH, sheet = 1,range ="GZ3:GZ63")
pleasureGridgp7least <- read_excel(gridexcelDataPATH, sheet = 1,range ="HM3:HM63")
pleasureGridgp8least <- read_excel(gridexcelDataPATH, sheet = 1,range ="HZ3:HZ63")
pleasureGridgp9least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IM3:IM63")
pleasureGridgp10least <- read_excel(gridexcelDataPATH, sheet = 1,range ="IZ3:IZ63")

pleasureGridVisualleast <- rbind(pleasureGridgp1least,pleasureGridgp2least,pleasureGridgp3least,pleasureGridgp4least,pleasureGridgp5least,
                                pleasureGridgp6least,pleasureGridgp7least,pleasureGridgp8least,pleasureGridgp9least,pleasureGridgp10least)

print(pleasureGridleast)

pleasureGridOverall <- rbind(pleasureGridSoundmost,pleasureGridSoundleast,pleasureGridVisualmost,pleasureGridVisualleast)


pleasureGridOverall[pleasureGridOverall == 5] <-  7
pleasureGridOverall[pleasureGridOverall == 4] <-  6
pleasureGridOverall[pleasureGridOverall == 1] <-  5
pleasureGridOverall[pleasureGridOverall == 2] <-  4
pleasureGridOverall[pleasureGridOverall == 6] <-  2
pleasureGridOverall[pleasureGridOverall == 7] <-  1

write.csv(pleasureGridOverall, paste(databaseSavePATH,"\\pleasure.csv",sep=""), row.names = FALSE)



install.packages("hexbin")
library(hexbin)

dfTensionpleasureSoundMost <- data.frame(x = soundmost, y = pleasureGridmost)
dfTensionpleasureSoundLeast <- data.frame(x = soundleast, y = pleasureGridleast)
dfTensionpleasureVisualMost <- data.frame(x = visualmost, y = pleasureGridmost)
dfTensionpleasureVisualLeast <- data.frame(x = visualleast, y = pleasureGridleast)
dfTensionpleasureBoth <- data.frame(x = soundAndVisualBoth, y = pleasureGridOverall)

library(RColorBrewer)
mycols <- brewer.pal(9, "Blues")
mycols[1] <- '#FFFFFF'
mycols[2] <- '#C4E0EC'
mycols[3] <- '#A1C8DC'
mycols[4] <- '#7EB0CB'
mycols[5] <- '#5F9BBC'
mycols[6] <- '#4086AD'
mycols[7] <- '#236F9A'
mycols[8] <- '#19506F'
mycols[9] <- '#14405A'
mycols[10] <- '#0B2130'
mycols[11] <- '#000000'


ggplot(dfTensionpleasureBoth, aes(x = TENSION, y = PLEASURE)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)+
  labs(x='Tension', y='Pleasure', title='Pleasure & Tension Correlation for All Tests') +
  theme_bw()

ggplot(dfTensionpleasureSoundMost, aes(x = TENSION, y = pleasure)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionpleasureVisualLeast, aes(x = TENSION, y = pleasure)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionpleasureVisualMost, aes(x = TENSION, y = pleasure)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)


ggplot(dfTensionpleasureBoth, aes(x = TENSION, y = pleasure)) +
  geom_density_2d_filled() +
  scale_fill_manual(values = mycols)+
  xlim(0, 10)
  

# THICKNESS SCATTER PLOT #########################################################################################################

#preparing data

# angularity
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="EP3:EP63")
gp1tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="ER3:ER63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="ET3:ET63")
gp1tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="EV3:EV63")

# irregularity
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="EG3:EG63")
gp2tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="EI3:EI63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="EK3:EK63")
gp2tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="EM3:EM63")

# orientation
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="DY3:DY63")
gp3tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="DZ3:DZ63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="EC3:EC63")
gp3tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="ED3:ED63")

# symmetry
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="CO3:CO63")
gp4tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="CP3:CP63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="CS3:CS63")
gp4tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="CT3:CT63")


most <- rbind(gp1most,gp2most,gp3most,gp4most)
tensionMost <- rbind(gp1tensionmost,gp2tensionmost,gp3tensionmost,gp4tensionmost)
least <- rbind(gp1least,gp2least,gp3least,gp4least)
tensionLeast <- rbind(gp1tensionleast,gp2tensionleast,gp3tensionleast,gp4tensionleast)

thickness <- rbind(most, least)
tension <- rbind(tensionMost, tensionLeast)

dfThickness <- data.frame(x = thickness, y = tension)

dfThicknessMost <- data.frame(x = most, y = tension)

print(dfThickness)

write.csv(dfThickness, paste(databaseSavePATH,"\\tensionThickness.csv",sep=""), row.names = FALSE)


ggplot(dfThicknessMost, aes(x = mo, y = tension, color = group)) +
  geom_beeswarm(cex = 3)


# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 6.6875, sd = 4.03129) #thickness
y2 <- dnorm(x,  mean = 6.5625, sd = 3.93017) #angularity
y3 <- dnorm(x,  mean = 7.1458, sd = 4.18768) #irregularity
y4 <- dnorm(x,  mean = 6.5833, sd = 4.23030) #orientation

(6.6875+6.5625+7.1458+6.5833) / 4 
(4.03129 + 3.93017 + 4.18768 + 4.23030) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Thickness)", xlab = "Thickness", ylim = c(0, 0.15),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Angularity", "Irregularity", "Orientation","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 2.0625, sd = 2.67229) #angularity
y2 <- dnorm(x,  mean = 3.3542, sd = 3.26684) #irregularity
y3 <- dnorm(x,  mean = 2.2917, sd = 3.01977) #orientation
y4 <- dnorm(x,  mean = 2.4792, sd = 3.31512) #symmetry


(2.0625+3.3542+2.2917+2.4792) / 4 
(2.67229 + 3.26684 + 3.01977 + 3.31512) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Thickness)", xlab = "Thickness", ylim = c(0, 0.15), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Angularity", "Irregularity", "Orientation","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


yleast <- dnorm(x,  mean = 6.744775, sd = 4.09486) #overall
ymost <- dnorm(x,  mean = 2.5469, sd = 3.068505) #overall

# plot data
plot(x,yleast, col="black", type="l", ylab = "P(Thickness)", xlab = "Thickness", ylim = c(0, 0.15), lwd=5.0) +
  theme_bw()

lines(x, ymost, type = "l", col = "gray",lwd=5.0)

legend( x= "topright", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))


# ATTACK DENSITY #########################################################################################################

#preparing data

# waveform
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="B3:B63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="F3:F63")

# release
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="AL3:AL63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="AP3:AP63")

# frequency
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="AU3:AU63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="AY3:AY63")

# amplitude
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="BD3:BD63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="BH3:BH63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

map_values <- function(x) {x * 3.0 / 10.0}
most <- data.frame(lapply(most,map_values))
least <- data.frame(lapply(least,map_values))

attack <- rbind(most, least)


dfAttack <- data.frame(x = attack, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Waveform', 'Release', 'Frequency', 'Amplitude'), each=60))

ggplot(dfAttack, aes(x = ATTACK, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Attack', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#F3672A","#9F1853","#005D5D","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()

# azul #118EE8, roxo #9F1853, laranja #F3672A, verde #005D5D

# RELEASE DENSITY #########################################################################################################

#preparing data

# waveform
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="K3:K63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="O3:O63")

# release
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="AM3:AM63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="AQ3:AQ63")

# frequency
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="BM3:BM63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="BQ3:BQ63")

# amplitude
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="BV3:BV63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="BZ3:BZ63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

map_values <- function(x) {x * 3.0 / 10.0}
most <- data.frame(lapply(most,map_values))
least <- data.frame(lapply(least,map_values))

release <- rbind(most, least)


dfRelease <- data.frame(x = release, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Waveform', 'Attack', 'Frequency', 'Amplitude'), each=60))

ggplot(dfRelease, aes(x = RELEASE, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Release', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#F3672A","#005D5D","#9F1853","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()



#### JOINED DENSITY

dfSoundAll = merge(x = dfAttack, y = dfRelease, by = c("tensionLevel","Test_Group"),
           all.y = TRUE)

colnames(release)[colnames(release) == "RELEASE"] <- "featureValue"
colnames(attack)[colnames(attack) == "ATTACK"] <- "featureValue"
colnames(amplitude)[colnames(amplitude) == "AMPLITUDE"] <- "featureValue"
colnames(freq)[colnames(freq) == "FREQUENCY"] <- "featureValue"

colnames(thickness)[colnames(thickness) == "THICKNESS"] <- "featureValue"
colnames(symmetry)[colnames(symmetry) == "SYMMETRY"] <- "featureValue"
colnames(angularity)[colnames(angularity) == "ANGULARITY"] <- "featureValue"
colnames(irregularity)[colnames(irregularity) == "IRREGULARITY"] <- "featureValue"
colnames(orientation)[colnames(orientation) == "ORIENTATION"] <- "featureValue"

featureSound <- rbind(release, attack, amplitude, freq)
featureVisual <- rbind(thickness, symmetry, angularity, irregularity, orientation)
featurevalues <- rbind(release, attack, amplitude, freq, thickness, symmetry, angularity, irregularity, orientation)

dfSound <- data.frame(x = featureSound, tensionLevel=rep(c('Most', 'Least'), each=240), feature=rep(c('Release', 'Attack','Amplitude','Frequency'), each=480))
dfVisual <- data.frame(x = featureVisual, tensionLevel=rep(c('Most', 'Least'), each=240), feature=rep(c("Thickness", "Symmetry", "Angularity", "Irregularity", "Orientation"), each=480))
dfAll <- data.frame(x = featurevalues, type=rep(c("Sound","Visual"), times=c(480*4,480*5)), tensionLevel=rep(c('Most', 'Least'), each=240), feature=rep(c('Release', 'Attack','Amplitude','Frequency', "Thickness", "Symmetry", "Angularity", "Irregularity", "Orientation"), each=480))

#240 most + 240 least = 480 de cada features, * 4; 4 sound, 5 visual

ggplot(dfSound, aes(x = featureValue, color=feature)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Feature (slider value)', y='Density', title='')+ 
  facet_grid(~tensionLevel)+
  scale_color_manual("Feature", values=c("#F3672A","#005D5D","#9F1853","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()

ggplot(dfVisual, aes(x = featureValue, color=feature)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Feature (slider value)', y='Density', title='')+ 
  facet_grid(~tensionLevel)+
  scale_color_manual("Feature", values=c("#F3672A","#005D5D","#9F1853","#118EE8","#C4A45D"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()

ggplot(dfAll, aes(x = featureValue, color=feature)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Feature (slider value)', y='Density', title='')+ 
  facet_grid(tensionLevel ~ type)+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()




# AMPLITUDE DENSITY #########################################################################################################

#preparing data

# waveform
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="AC3:AC63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="AG3:AG63")

# release
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="BW3:BW63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="CA3:CA63")

# frequency
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="CF3:CF63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="CJ3:CJ63")

# attack
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="BE3:BE63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="BI3:BI63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

map_values <- function(x) {x * 1.0 / 10}
most <- data.frame(lapply(most,map_values))
least <- data.frame(lapply(least,map_values))

amplitude <- rbind(most, least)


dfAmplitude <- data.frame(x = amplitude, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Waveform', 'Release', 'Frequency', 'Attack'), each=60))

ggplot(dfAmplitude, aes(x = AMPLITUDE, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Amplitude', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#005D5D","#F3672A","#9F1853","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()

# THICKNESS DENSITY #########################################################################################################

#preparing data

# symmetry
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="CO3:CO63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="CS3:CS63")

# orientation
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="DY3:DY63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="EC3:EC63")

# irregularity
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="EG3:EG63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="EK3:EK63")

# angularity
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="EP3:EP63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="ET3:ET63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

thickness <- rbind(most, least)


dfThickness <- data.frame(x = thickness, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Symmetry', 'Orientation', 'Irregularity', 'Angularity'), each=60))

ggplot(dfThickness, aes(x = THICKNESS, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Thickness', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#118EE8","#005D5D","#9F1853","#F3672A"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()


# SYMMETRY SCATTER PLOT #########################################################################################################

#preparing data

# thickness
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="CN3:CN63")
gp1tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="CP3:CP63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="CR3:CR63")
gp1tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="CT3:CT63")

# orientation
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="CW3:CW63")
gp2tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="CY3:CY63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="DA3:DA63")
gp2tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="DC3:DC63")

# irregularity
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="DF3:DF63")
gp3tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="DH3:DH63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="DJ3:DJ63")
gp3tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="DL3:DL63")

# angularity
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="DO3:DO63")
gp4tensionmost <- read_excel(excelDataPATH, sheet = 1,range ="DQ3:DQ63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="DS3:DS63")
gp4tensionleast <- read_excel(excelDataPATH, sheet = 1,range ="DU3:DU63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
tensionMost <- rbind(gp1tensionmost,gp2tensionmost,gp3tensionmost,gp4tensionmost)
least <- rbind(gp1least,gp2least,gp3least,gp4least)
tensionLeast <- rbind(gp1tensionleast,gp2tensionleast,gp3tensionleast,gp4tensionleast)

symmetry <- rbind(most, least)
#tension <- rbind(tensionMost, tensionLeast)
#dfSymmetry <- data.frame(x = symmetry, y = tension, group=rep(c('Symmetry x Thickness', 'Symmetry x Orientation', 'Symmetry x Irregularity', 'Symmetry x Angularity'), each=60), tensionLevel=rep(c('Most', 'Least'), each=240))

dfSymmetryMost <-data.frame(x = most, Test_Group=rep(c('Symmetry x Thickness', 'Symmetry x Orientation', 'Symmetry x Irregularity', 'Symmetry x Angularity'), each=60)) 
dfSymmetryLeast <-data.frame(x = least, Test_Group=rep(c('Symmetry x Thickness', 'Symmetry x Orientation', 'Symmetry x Irregularity', 'Symmetry x Angularity'), each=60)) 
dfSymmetry <- data.frame(x = symmetry, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Thickness', 'Orientation', 'Irregularity', 'Angularity'), each=60))

ggplot(dfSymmetry, aes(x = SYMMETRY, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Symmetry', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#005D5D","#9F1853","#F3672A","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()


#EXPORTING DATABASE
write.csv(dfSymmetry, paste(databaseSavePATH,"\\tensionSymmetry.csv",sep=""), row.names = FALSE)

barplot(dfSymmetry,
        main = "Survival of Each Class",
        xlab = "Class",
        col = c("red","green")
)
legend("topleft",
       c("Not survived","Survived"),
       fill = c("red","green")
)



# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 3.0417, sd = 3.44729) #thickness
y2 <- dnorm(x,  mean = 1.4375, sd = 2.04329) #angularity
y3 <- dnorm(x,  mean = 2.5625, sd = 3.26630) #irregularity
y4 <- dnorm(x,  mean = 2.2292, sd = 3.36743) #orientation

(3.0417+1.4375+2.5625+2.2292) / 4 
(3.44729 + 2.04329 + 3.26630 + 3.36743) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Symmetry)", xlab = "Symmetry", ylim = c(0, 0.25),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topright", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity", "Orientation","Average"), 
        fill=c("red","blue","green","purple","black"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 8.8958, sd = 2.62497) #thickness
y2 <- dnorm(x,  mean = 9.2708, sd = 1.51426) #angularity
y3 <- dnorm(x,  mean = 8.1875, sd = 3.20904) #irregularity
y4 <- dnorm(x,  mean = 8.7292, sd = 2.91558) #orientation


(8.8958+9.2708+8.1875+8.7292) / 4 
(2.62497 + 1.51426 + 3.20904 + 2.91558) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Symmetry)", xlab = "Symmetry", ylim = c(0, 0.26), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)

lines(x, y5, type = "l", col = "black",lwd=5.0)


legend( x= "topleft", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity", "Orientation"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


yleast <- dnorm(x,  mean = 2.317725, sd = 3.031077) #overall
ymost <- dnorm(x,  mean = 8.770825, sd = 2.565962) #overall

# plot data
plot(x,yleast, col="black", type="l", ylab = "P(Symmetry)", xlab = "Symmetry", ylim = c(0, 0.26), lwd=5.0) +
  theme_bw()

lines(x, ymost, type = "l", col = "gray",lwd=5.0)

legend( x= "topleft", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))


# ANGULARITY SCATTER PLOT #########################################################################################################

#preparing data

# symmetry
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="DP3:DP63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="DT3:DT63")

# thickness
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="EQ3:EQ63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="EU3:EU63")

# orientation
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="FH3:FH63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="FL3:FL63")

# irregularity
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="FQ3:FQ63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="FU3:FU63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

angularity <- rbind(most, least)

dfAngularity <- data.frame(x = angularity, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Symmetry', 'Thickness', 'Orientation', 'Irregularity'), each=60))

ggplot(dfAngularity, aes(x = ANGULARITY, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Angularity', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#005D5D","#9F1853","#F3672A","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()


write.csv(dfirregularity, paste(databaseSavePATH,"\\tensionIrregularity.csv",sep=""), row.names = FALSE)

# IRREGULARITY SCATTER PLOT #########################################################################################################

#preparing data

# symmetry
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="DG3:DG63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="DK3:DK63")

# thickness
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="EH3:EH63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="EL3:EL63")

# orientation
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="EZ3:EZ63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="FD3:FD63")

# angularity
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="FR3:FR63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="FV3:FV63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

irregularity <- rbind(most, least)

dfIrregularity <- data.frame(x = irregularity, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Symmetry', 'Thickness', 'Orientation', 'Angularity'), each=60))

ggplot(dfIrregularity, aes(x = IRREGULARITY, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Irregularity', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#005D5D","#9F1853","#F3672A","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()


write.csv(dfirregularity, paste(databaseSavePATH,"\\tensionIrregularity.csv",sep=""), row.names = FALSE)


# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 5.0208, sd = 4.10077) #thickness
y2 <- dnorm(x,  mean = 6.0625, sd = 3.47376) #angularity
y3 <- dnorm(x,  mean = 6.2708, sd = 4.29631) #orientation
y4 <- dnorm(x,  mean = 5.8542, sd = 3.94273) #symmetry

(5.0208+6.0625+6.2708+5.8542) / 4 
(4.10077 + 3.47376 + 4.29631 + 3.94273) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Irregularity)", xlab = "Irregularity", ylim = c(0, 0.15),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Thickness", "Angularity", "Orientation","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 4.5833, sd = 3.93718) 
y2 <- dnorm(x,  mean = 4.1458, sd = 3.83375) 
y3 <- dnorm(x,  mean = 4.0208, sd = 3.82407)
y4 <- dnorm(x,  mean = 4.2708, sd = 4.15721) 


(4.5833+4.1458+4.0208+4.2708) / 4 
(3.93718 + 3.83375 + 3.82407 + 4.15721) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Irregularity)", xlab = "Irregularity", ylim = c(0, 0.15), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Thickness", "Angularity", "Orientation","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 5.802075, sd = 3.953392) #overall
yleast <- dnorm(x,  mean = 4.255175, sd = 3.938052) #overall

# plot data
plot(x,ymost, col="black", type="l", ylab = "P(Irregularity)", xlab = "Irregularity", ylim = c(0, 0.15), lwd=5.0) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topright", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))

# ANGULARITY #########################################################################################################



# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 8.3750, sd = 2.60683) #thickness
y2 <- dnorm(x,  mean = 7.9583, sd = 3.59471) #angularity
y3 <- dnorm(x,  mean = 7.5208, sd = 3.62790) #irregularity
y4 <- dnorm(x,  mean = 8.5208, sd = 2.20135) #symmetry

(8.3750+7.9583+7.5208+8.5208) / 4 
(2.60683 + 3.59471 + 3.62790 + 2.20135) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Angularity)", xlab = "Angularity", ylim = c(0, 0.20),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 2.9167, sd = 2.27443) 
y2 <- dnorm(x,  mean = 5.3333, sd = 2.57171) 
y3 <- dnorm(x,  mean = 2.5417, sd = 3.70357)
y4 <- dnorm(x,  mean = 3.5208, sd = 2.43008) 


(2.9167+5.3333+2.5417+3.5208) / 4 
(2.27443 + 2.57171 + 3.70357 + 2.43008) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 8.093725, sd = 3.007697) #overall
yleast <- dnorm(x,  mean = 3.578125, sd = 2.744948) #overall


# plot data
plot(x,ymost, col="black", type="l", ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20), lwd=5.0) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topright", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))



# ORIENTATION SCATTER PLOT #########################################################################################################

#preparing data

# symmetry
gp1most <- read_excel(excelDataPATH, sheet = 1,range ="CX3:CX63")
gp1least <- read_excel(excelDataPATH, sheet = 1,range ="DB3:DB63")

# thickness
gp2most <- read_excel(excelDataPATH, sheet = 1,range ="DX3:DX63")
gp2least <- read_excel(excelDataPATH, sheet = 1,range ="EB3:EB63")

# irregularity
gp3most <- read_excel(excelDataPATH, sheet = 1,range ="EY3:EY63")
gp3least <- read_excel(excelDataPATH, sheet = 1,range ="FC3:FC63")

# angularity
gp4most <- read_excel(excelDataPATH, sheet = 1,range ="FI3:FI63")
gp4least <- read_excel(excelDataPATH, sheet = 1,range ="FM3:FM63")

most <- rbind(gp1most,gp2most,gp3most,gp4most)
least <- rbind(gp1least,gp2least,gp3least,gp4least)

orientation <- rbind(most, least)

dfOrientation <- data.frame(x = orientation, tensionLevel=rep(c('Most', 'Least'), each=240), Test_Group=rep(c('Symmetry', 'Thickness', 'Irregularity', 'Angularity'), each=60))

ggplot(dfOrientation, aes(x = ORIENTATION, color=Test_Group)) +
  geom_density(adjust = 1.75, lwd = 1)+
  labs(x='Orientation', y='Density', title='')+ 
  facet_grid(tensionLevel ~ Test_Group)+
  scale_color_manual(values=c("#005D5D","#9F1853","#F3672A","#118EE8"))+
  guides(color = guide_legend(reverse=TRUE))+
  theme_bw()


write.csv(dforientation, paste(databaseSavePATH,"\\tensionOrientation.csv",sep=""), row.names = FALSE)


# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 5.5, sd = 3.03755) #thickness
y2 <- dnorm(x,  mean = 5.8125, sd = 2.93670) #angularity
y3 <- dnorm(x,  mean = 5.4167, sd = 3.29248) #irregularity
y4 <- dnorm(x,  mean = 5.5, sd = 2.92201) #symmetry

(5.5+5.8125+5.4167+5.5) / 4 
(3.03755 + 2.93670 + 3.29248 + 2.92201) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 0.9167, sd = 2.55103) 
y2 <- dnorm(x,  mean = 3.6042, sd = 3.84479) 
y3 <- dnorm(x,  mean = 1.7917, sd = 3.52328)
y4 <- dnorm(x,  mean = 5.5417, sd = 3.12493) 


(0.9167+3.6042+1.7917+5.5417) / 4 
(2.55103 + 3.84479 + 3.52328 + 3.12493) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 2.963575, sd = 3.261007) #overall
yleast <- dnorm(x,  mean = 5.5573, sd = 3.047185) #overall


# plot data
plot(x,ymost, col="black", type="l", ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20), lwd=5.0) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topright", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))



# MOST / LEAST GAUSSIANS #########################################################################################################

# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0, 10, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 5.5, sd = 3.03755) #thickness
y2 <- dnorm(x,  mean = 5.8125, sd = 2.93670) #angularity
y3 <- dnorm(x,  mean = 5.4167, sd = 3.29248) #irregularity
y4 <- dnorm(x,  mean = 5.5, sd = 2.92201) #symmetry

(5.5+5.8125+5.4167+5.5) / 4 
(3.03755 + 2.93670 + 3.29248 + 2.92201) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 0.9167, sd = 2.55103) 
y2 <- dnorm(x,  mean = 3.6042, sd = 3.84479) 
y3 <- dnorm(x,  mean = 1.7917, sd = 3.52328)
y4 <- dnorm(x,  mean = 5.5417, sd = 3.12493) 


(0.9167+3.6042+1.7917+5.5417) / 4 
(2.55103 + 3.84479 + 3.52328 + 3.12493) / 4 

# plot data
plot(x,y1, col="red", type="l", ylab = "P(Orientation)", xlab = "Orientation", ylim = c(0, 0.20), lwd=2.0) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Thickness", "Angularity", "Irregularity","Symmetry"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


yOrientationmost <- dnorm(x,  mean = 2.963575, sd = 3.261007) #overall
yOrientationleast <- dnorm(x,  mean = 5.5573, sd = 3.047185) #overall

yIrregularitymost <- dnorm(x,  mean = 5.802075, sd = 3.953392) #overall
yIrregularityleast <- dnorm(x,  mean = 4.255175, sd = 3.938052) #overall

ySymmetryleast <- dnorm(x,  mean = 2.317725, sd = 3.031077) #overall
ySymmetrymost <- dnorm(x,  mean = 8.770825, sd = 2.565962) #overall

yThicknessleast <- dnorm(x,  mean = 6.744775, sd = 4.09486) #overall
yThicknessmost <- dnorm(x,  mean = 2.5469, sd = 3.068505) #overall

yAngularitymost <- dnorm(x,  mean = 8.093725, sd = 3.007697) #overall
yAngularityleast <- dnorm(x,  mean = 3.578125, sd = 2.744948) #overall


# plot data
plot(x,yOrientationmost, col="red", type="l", ylab = "P(Feature Value)", xlab = "Feature Value", ylim = c(0, 0.20), lwd=5.0) +
  theme_bw()

lines(x, yIrregularitymost, type = "l", col = "blue",lwd=5.0, pch=".", )
lines(x, ySymmetrymost, type = "l", col = "green",lwd=5.0, pch=".", )
lines(x, yThicknessmost, type = "l", col = "purple",lwd=5.0, pch=".", )
lines(x, yAngularitymost, type = "l", col = "orange",lwd=5.0, pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Orientation", "Irregularity","Symmetry","Thickness","Angularity"), fill=c("red","blue","green","purple","orange"))


# plot data
plot(x,yOrientationleast, col="#CCCCCC",  pch=1, type="l", ylab = "P(Feature Value)", xlab = "Feature Value", ylim = c(0, 0.20), lwd=5.0) +
  theme_bw()

lines(x, yIrregularityleast, type = "l", col = "#999999",lwd=5.0, pch=2)
lines(x, ySymmetryleast, type = "l", col = "#666666",lwd=5.0, pch=3 )
lines(x, yThicknessleast, type = "l", col = "#333333",lwd=5.0, pch=4 )
lines(x, yAngularityleast, type = "l", col = "#000000",lwd=5.0, pch=5 )


legend( x= "topleft", y=0.92, 
        legend=c("Orientation", "Irregularity","Symmetry","Thickness","Angularity"), fill=c("#CCCCCC","#999999", "#666666","#333333","#000000"))

# ATTACK #########################################################################################################



# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0.0, 3.0, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 1.2062, sd = 1.00787) #waveform
y2 <- dnorm(x,  mean = 1.3187, sd = 0.99693) #release
y3 <- dnorm(x,  mean = 1.3563, sd = 1.10056) #frequency
y4 <- dnorm(x,  mean = 1.4438, sd = 1.03294) #amplitude

(1.2062+1.3187+1.3563+1.4438) / 4 
(1.00787 + 0.99693 + 1.10056 + 1.03294) / 4 

# plot data
plot(x,ymost, col="red", type="l",  ylab = "P(Attack)", xlab = "Attack", ylim = c(0, 0.40),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topright", y=0.92, 
        legend=c("Waveform", "Release", "Frequency","Amplitude"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 1.6312, sd = 1.08910) 
y2 <- dnorm(x,  mean = 1.9125, sd = 0.99264) 
y3 <- dnorm(x,  mean = 1.7937, sd = 1.10056)
y4 <- dnorm(x,  mean = 1.4313, sd = 0.97762) 


(1.6312+1.9125+1.7937+1.4313) / 4 
(1.08910 + 0.99264 + 1.10056 + 0.97762) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Attack)", xlab = "Attack", ylim = c(0, 0.40),lwd=2.0,pch=".", ) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topleft", y=0.92, 
        legend=c("Waveform", "Release", "Frequency","Amplitude"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 1.33125, sd = 1.034575) #overall
yleast <- dnorm(x,  mean = 1.692175, sd = 1.03998) #overall


# plot data
plot(x,ymost, col="black", type="l",  ylab = "P(Attack)", xlab = "Attack", ylim = c(0, 0.40),lwd=5.0,pch=".", ) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topleft", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))

# RELEASE #########################################################################################################


# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0.0, 3.0, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 1.5625, sd = 1.09203) #waveform
y2 <- dnorm(x,  mean = 1.4688, sd = 1.09448) #attack
y3 <- dnorm(x,  mean = 1.9000, sd = 1.06708) #frequency
y4 <- dnorm(x,  mean = 1.7375, sd = 1.06708) #amplitude

(1.5625+1.4688+1.9000+1.7375) / 4 
(1.09203 + 1.09448 + 1.06708 + 1.06708) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Release)", xlab = "Release", ylim = c(0, 0.40),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Waveform", "Attack", "Frequency","Amplitude"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 1.4375, sd = 1.03833) 
y2 <- dnorm(x,  mean = 1.4375, sd = 1.01276) 
y3 <- dnorm(x,  mean = 1.2688, sd = 0.99118)
y4 <- dnorm(x,  mean = 1.2750, sd = 1.03150) 


(1.4375+1.4375+1.2688+1.2750) / 4 
(1.03833 + 1.01276 + 0.99118 + 1.03150) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Release)", xlab = "Release", ylim = c(0, 0.40),lwd=2.0,pch=".", ) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Waveform", "Attack", "Frequency","Amplitude"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 1.6672, sd = 1.080167) #overall
yleast <- dnorm(x,  mean = 1.3547, sd = 1.018443) #overall


# plot data
plot(x,ymost, col="black", type="l",  ylab = "P(Release)", xlab = "Release", ylim = c(0, 0.40),lwd=5.0,pch=".", ) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topright", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))

legend=c("Least", "Most"), fill=c("gray","black"))


# AMPLITUDE #########################################################################################################


# sequence of numbers between -10 and 10 incrementing by 0.1.
x <- seq(0.0, 1.0, length.out=175)  

# getting probability distribution
y1 <- dnorm(x,  mean = 0.7833, sd = 0.25197) 
y2 <- dnorm(x,  mean = 0.7583, sd = 0.26826) 
y3 <- dnorm(x,  mean = 0.7875, sd = 0.24389)
y4 <- dnorm(x,  mean = 0.7771, sd = 0.25740) 

(0.7833+0.7583+0.7875+0.7771) / 4 
(0.25197 + 0.26826 + 0.24389 + 0.25740) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Amplitude)", xlab = "Amplitude", ylim = c(0, 1.6),lwd=2.0,pch=".", ) +
  theme_bw()

lines(x, y2, type = "l", col = "blue",lwd=2.0, pch=".", )

lines(x, y3, type = "l", col = "green",lwd=2.0, pch=".", )

lines(x, y4, type = "l", col = "purple",lwd=2.0,pch=".", )


legend( x= "topleft", y=0.92, 
        legend=c("Waveform", "Attack", "Release","Frequency"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))



# getting probability distribution
y1 <- dnorm(x,  mean = 0.2271, sd = 0.28606) 
y2 <- dnorm(x,  mean = 0.2729, sd = 0.31175) 
y3 <- dnorm(x,  mean = 0.2667, sd = 0.30048)
y4 <- dnorm(x,  mean = 0.3188, sd = 0.28692) 


(0.2271+0.2729+0.2667+0.3188) / 4 
(0.28606 + 0.31175 + 0.30048 + 0.28692) / 4 

# plot data
plot(x,y1, col="red", type="l",  ylab = "P(Amplitude)", xlab = "Amplitude", ylim = c(0, 1.5),lwd=2.0,pch=".", ) +
  theme_bw()


lines(x, y2, type = "l", col = "blue",lwd=2.0)

lines(x, y3, type = "l", col = "green",lwd=2.0)

lines(x, y4, type = "l", col = "purple",lwd=2.0)


legend( x= "topright", y=0.92, 
        legend=c("Waveform", "Attack", "Frequency","Amplitude"), 
        fill=c("red","blue","green","purple"), pch=c(".",".", ".", "."))


ymost <- dnorm(x,  mean = 0.77655, sd = 0.25538) #overall
yleast <- dnorm(x,  mean = 0.271375, sd = 0.2963025) #overall


# plot data
plot(x,ymost, col="black", type="l",  ylab = "P(Amplitude)", xlab = "Amplitude", ylim = c(0, 1.60),lwd=5.0,pch=".", ) +
  theme_bw()

lines(x, yleast, type = "l", col = "gray",lwd=5.0)

legend( x= "topleft", y=0.92, 
        legend=c("Least", "Most"), fill=c("gray","black"))


############# SAVE SVG PLOTS TO FOLDER
svg(filename="rPlots\\waveformMost.svg", 
    width=8, 
    height=6, 
    pointsize=12)
waveformMostplot
dev.off()
svg(filename="rPlots\\waveformLeast.svg", 
    width=8, 
    height=6, 
    pointsize=12)
waveformLeastplot
dev.off()
svg(filename="rPlots\\overallWaveformMost.svg", 
    width=8, 
    height=6, 
    pointsize=12)
overallWaveformMost
dev.off()
svg(filename="rPlots\\overallWaveforLeast.svg", 
    width=8, 
    height=6, 
    pointsize=12)
overallWaveformLeast
dev.off()
svg(filename="rPlots\\frequencyMost.svg", 
    width=8, 
    height=6, 
    pointsize=12)
frequencyMostplot
dev.off()
svg(filename="rPlots\\frequencyLeast.svg", 
    width=8, 
    height=6, 
    pointsize=12)
frequencyLeastplot
dev.off()
svg(filename="rPlots\\overallfrequencyMost.svg", 
    width=8, 
    height=6, 
    pointsize=12)
frequencyMostOverall
dev.off()
svg(filename="rPlots\\overallfrequencyLeast.svg", 
    width=8, 
    height=6, 
    pointsize=12)
frequencyLeastOverall
dev.off()
svg(filename="rPlots\\soundAndVisualTension.svg", 
    width=8, 
    height=8, 
    pointsize=12)
soundAndVisualTension
dev.off()
