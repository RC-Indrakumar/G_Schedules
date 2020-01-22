package com.org.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FibonacciLogic {

    private static void printSeries(int input) {
        if (input <= 0) {
            System.out.println("Please provide a positive non-zero integer.");
            return;
        }
        int[] fibArray = new int[input];
        fibArray[0] = 0;
        fibArray[1] = 1;
        try {
            for (int index = 0; index < input - 1; index++) {
                if (index == 0 || index == 1) {
                    System.out.print(fibArray[index] + " , ");
                }
                if (index != 0) {
                    fibArray[index + 1] = fibArray[index - 1] + fibArray[index];
                    System.out.print(fibArray[index + 1] + " , ");
                }
            }
        } catch (Exception e) {
            System.out.println("Oops! Caught Error.");
        }
    }

    private static String getNonDefaultFormCreatorLinks() {
        String appId = "staging";
		List<String> stagingVersions_jobssystem = Arrays.asList("10", "15", "mapper2", "vr", "v1", "16", "mapper", "1", "in", "3",
				"newdesign", "report", "salesforce", "jsbackend", "builtaccountsbackend");
		List<String> stagingVersions_fc = Arrays.asList("in", "beta", "search", "vr", "me", "1", "gj", "mk", "10", "nes",
				"239", "timezone");
		if (appId.toLowerCase().contains("staging")) {
			String jobssystemLinks = stagingVersions_jobssystem.stream().reduce("", (prev, next) -> {
				return prev + " " + (next + "-dot-staging-jobssystem-v3.appspot.com");
			});
			String formcreatorLinks = stagingVersions_fc.stream().reduce("", (prev, next) -> {
				return prev + " " + (next + "-dot-staging-formcreator.appspot.com");
			});
			return jobssystemLinks + formcreatorLinks;
		} else if (appId.toLowerCase().contains("live")) {

		}
		return null;
	}

    public static void main(String args[]) {
        // int input;
        // Scanner inputObject = new Scanner(System.in);
        // System.out.println("Enter the value: ");
        // input = inputObject.nextInt();
        // printSeries(input);

        System.out.println(getNonDefaultFormCreatorLinks());

        // regex example
        // String trial = "ab'nfa";
        // Pattern regex = Pattern.compile("[!#$%^&*()?\":{}|<>]");
        // Matcher matcher = regex.matcher(trial);
        // System.out.println(matcher.find());
    }
}